/************
 GENERATE KEYS
 ************/
if (localStorage.getItem('KeysGenerated') === null || localStorage.getItem('KeysGenerated') !== "true") {
    // GENERATE -- LATER ON LOGIN!
    var EncryptionPhrase = "PASSWORD 123"; // THE USERS PASSWORD
    var RSABitLength = 1024;
    var PrivateKeyString = cryptico.generateRSAKey(EncryptionPhrase, RSABitLength);
    var PublicKeyString = cryptico.publicKeyString(PrivateKeyString);
    // SAVE TO DATABASE
    $.ajax({
        type: "POST",
        url: "assets/php/SavePublicKey.php",
        data: {
            UserID: "1", // TEMPORARY
            PublicKeyString: PublicKeyString
        },
        async: true,
        error: function () {
            console.error("Error while saving public key to database!");
        },
        success: function () {
            localStorage.setItem('KeysGenerated', "true");
        }
    });
}


/******
 GENERAL
 ******/

var ChatTextInput = $("#ChatTextInput");
var SubscribeTextInput = $("#SubscribeTextInput");
var ChatMessages = $("#ChatMessages");

var WebSocket = new WebSocket('wss://marvinborner.ddnss.de:1337');
WebSocket.onopen = function () {
    console.log("Chat connection established!");
};
WebSocket.onmessage = function (e) {
    var MessageObject = JSON.parse(e.data);
    if (MessageObject.ServerMessage === false) {
        if (MessageObject.WasHimself === true) { //MessageObject.Username
            ChatMessages.append("<div class='ChatMessage MessageSent'>" + MessageObject.Message + "</div><br><br>");
        } else if (MessageObject.WasHimself === false) {
            ChatMessages.append("<div class='ChatMessage MessageReceived'>" + MessageObject.Message + "</div><br><br>");
        }
    } else if (MessageObject.ServerMessage === true) {
        if (MessageObject.ServerMessageType === "GroupJoin") {
            if (MessageObject.WasHimself === false) {
                ChatMessages.append("<div class='ServerChatMessage'>" + MessageObject.Username + " <span class='ServerChatMessage' data-lang='joined the group'></span>.</div><br>");
            } else if (MessageObject.WasHimself === true) {
                ChatMessages.empty();
                ChatMessages.append("<div class='ServerChatMessage'><span data-lang='You joined the group'> " + MessageObject.GroupName + "</span>.</div><br>");
            }
        } else if (MessageObject.ServerMessageType === "UserDisconnect") {
            ChatMessages.append("<div class='ServerChatMessage'>" + MessageObject.Username + " <span data-lang='has disconnected from the server'></span>.</div><br>");
        }
    }
    initiateLanguage(); // need further work (performance)
};

ChatTextInput.keyup(function (e) {
    if (e.keyCode === 13) {
        sendMessage(ChatTextInput.val());
        ChatTextInput.val("");
    }
});

SubscribeTextInput.keyup(function (e) {
    if (e.keyCode === 13) {
        subscribe(SubscribeTextInput.val());
    }
});

function subscribe(channel) {
    WebSocket.send(JSON.stringify({ClientMessageType: "Subscribe", Channel: channel}));
    SubscribeTextInput.hide();
    ChatTextInput.show();
}

function sendMessage(msg) {
    WebSocket.send(JSON.stringify({ClientMessageType: "Message", Message: msg}));
    ChatTextInput.val("");
}
