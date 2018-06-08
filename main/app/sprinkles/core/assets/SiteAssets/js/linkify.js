!function () {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
        return typeof n
    } : function (n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    };
    !function (e) {
        function a(n, e) {
            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, t = Object.create(n.prototype);
            for (var o in a) t[o] = a[o];
            return t.constructor = e, e.prototype = t, e
        }

        function t(n) {
            n = n || {}, this.defaultProtocol = n.hasOwnProperty("defaultProtocol") ? n.defaultProtocol : h.defaultProtocol, this.events = n.hasOwnProperty("events") ? n.events : h.events, this.format = n.hasOwnProperty("format") ? n.format : h.format, this.formatHref = n.hasOwnProperty("formatHref") ? n.formatHref : h.formatHref, this.nl2br = n.hasOwnProperty("nl2br") ? n.nl2br : h.nl2br, this.tagName = n.hasOwnProperty("tagName") ? n.tagName : h.tagName, this.target = n.hasOwnProperty("target") ? n.target : h.target, this.validate = n.hasOwnProperty("validate") ? n.validate : h.validate, this.ignoreTags = [], this.attributes = n.attributes || n.linkAttributes || h.attributes, this.className = n.hasOwnProperty("className") ? n.className : n.linkClass || h.className;
            for (var e = n.hasOwnProperty("ignoreTags") ? n.ignoreTags : h.ignoreTags, a = 0; a < e.length; a++) this.ignoreTags.push(e[a].toUpperCase())
        }

        function o(n, e) {
            for (var a = 0; a < n.length; a++) if (n[a] === e) return !0;
            return !1
        }

        function r(n) {
            return n
        }

        function i(n, e) {
            return "url" === e ? "_blank" : null
        }

        function s() {
            return function (n) {
                this.j = [], this.T = n || null
            }
        }

        function c(n, e, a, t) {
            for (var o = 0, r = n.length, i = e, s = [], c = void 0; o < r && (c = i.next(n[o]));) i = c, o++;
            if (o >= r) return [];
            for (; o < r - 1;) c = new m(t), s.push(c), i.on(n[o], c), i = c, o++;
            return c = new m(a), s.push(c), i.on(n[r - 1], c), s
        }

        function l() {
            return function (n) {
                n && (this.v = n)
            }
        }

        function u(n) {
            var e = n ? {v: n} : {};
            return a(d, l(), e)
        }

        function g(n) {
            return n instanceof x || n instanceof C
        }

        var h = {
            defaultProtocol: "http",
            events: null,
            format: r,
            formatHref: r,
            nl2br: !1,
            tagName: "a",
            target: i,
            validate: !0,
            ignoreTags: [],
            attributes: null,
            className: "linkified"
        };
        t.prototype = {
            resolve: function (n) {
                var e = n.toHref(this.defaultProtocol);
                return {
                    formatted: this.get("format", n.toString(), n),
                    formattedHref: this.get("formatHref", e, n),
                    tagName: this.get("tagName", e, n),
                    className: this.get("className", e, n),
                    target: this.get("target", e, n),
                    events: this.getObject("events", e, n),
                    attributes: this.getObject("attributes", e, n)
                }
            }, check: function (n) {
                return this.get("validate", n.toString(), n)
            }, get: function (e, a, t) {
                var o = void 0, r = this[e];
                if (!r) return r;
                switch ("undefined" == typeof r ? "undefined" : n(r)) {
                    case"function":
                        return r(a, t.type);
                    case"object":
                        return o = r.hasOwnProperty(t.type) ? r[t.type] : h[e], "function" == typeof o ? o(a, t.type) : o
                }
                return r
            }, getObject: function (n, e, a) {
                var t = this[n];
                return "function" == typeof t ? t(e, a.type) : t
            }
        };
        var b = Object.freeze({defaults: h, Options: t, contains: o}), p = s();
        p.prototype = {
            defaultTransition: !1, on: function (n, e) {
                if (n instanceof Array) {
                    for (var a = 0; a < n.length; a++) this.j.push([n[a], e]);
                    return this
                }
                return this.j.push([n, e]), this
            }, next: function (n) {
                for (var e = 0; e < this.j.length; e++) {
                    var a = this.j[e], t = a[0], o = a[1];
                    if (this.test(n, t)) return o
                }
                return this.defaultTransition
            }, accepts: function () {
                return !!this.T
            }, test: function (n, e) {
                return n === e
            }, emit: function () {
                return this.T
            }
        };
        var m = a(p, s(), {
            test: function (n, e) {
                return n === e || e instanceof RegExp && e.test(n)
            }
        }), f = a(p, s(), {
            jump: function (n) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, a = this.next(new n(""));
                return a === this.defaultTransition ? (a = new this.constructor(e), this.on(n, a)) : e && (a.T = e), a
            }, test: function (n, e) {
                return n instanceof e
            }
        }), d = l();
        d.prototype = {
            toString: function () {
                return this.v + ""
            }
        };
        var x = u(), y = u("@"), v = u(":"), k = u("."), w = u(), j = u(), z = u("\n"), O = u(), q = u("+"), N = u("#"),
            S = u(), T = u("mailto:"), A = u("?"), L = u("/"), P = u("_"), E = u(), C = u(), R = u(), H = u("{"),
            B = u("["), U = u("<"), M = u("("), D = u("}"), I = u("]"), K = u(">"), _ = u(")"), G = u("&"),
            Y = Object.freeze({
                Base: d,
                DOMAIN: x,
                AT: y,
                COLON: v,
                DOT: k,
                PUNCTUATION: w,
                LOCALHOST: j,
                NL: z,
                NUM: O,
                PLUS: q,
                POUND: N,
                QUERY: A,
                PROTOCOL: S,
                MAILTO: T,
                SLASH: L,
                UNDERSCORE: P,
                SYM: E,
                TLD: C,
                WS: R,
                OPENBRACE: H,
                OPENBRACKET: B,
                OPENANGLEBRACKET: U,
                OPENPAREN: M,
                CLOSEBRACE: D,
                CLOSEBRACKET: I,
                CLOSEANGLEBRACKET: K,
                CLOSEPAREN: _,
                AMPERSAND: G
            }),
            Q = "aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw".split("|"),
            W = "0123456789".split(""), X = "0123456789abcdefghijklmnopqrstuvwxyz".split(""),
            Z = [" ", "\f", "\r", "\t", "\x0B", " ", " ", "᠎"], F = [], J = function (n) {
                return new m(n)
            }, V = J(), $ = J(O), nn = J(x), en = J(), an = J(R);
        V.on("@", J(y)).on(".", J(k)).on("+", J(q)).on("#", J(N)).on("?", J(A)).on("/", J(L)).on("_", J(P)).on(":", J(v)).on("{", J(H)).on("[", J(B)).on("<", J(U)).on("(", J(M)).on("}", J(D)).on("]", J(I)).on(">", J(K)).on(")", J(_)).on("&", J(G)).on([",", ";", "!", '"', "'"], J(w)), V.on("\n", J(z)).on(Z, an), an.on(Z, an);
        for (var tn = 0; tn < Q.length; tn++) {
            var on = c(Q[tn], V, C, x);
            F.push.apply(F, on)
        }
        var rn = c("file", V, x, x), sn = c("ftp", V, x, x), cn = c("http", V, x, x), ln = c("mailto", V, x, x);
        F.push.apply(F, rn), F.push.apply(F, sn), F.push.apply(F, cn), F.push.apply(F, ln);
        var un = rn.pop(), gn = sn.pop(), hn = cn.pop(), bn = ln.pop(), pn = J(x), mn = J(S), fn = J(T);
        gn.on("s", pn).on(":", mn), hn.on("s", pn).on(":", mn), F.push(pn), un.on(":", mn), pn.on(":", mn), bn.on(":", fn);
        var dn = c("localhost", V, j, x);
        F.push.apply(F, dn), V.on(W, $), $.on("-", en).on(W, $).on(X, nn), nn.on("-", en).on(X, nn);
        for (var xn = 0; xn < F.length; xn++) F[xn].on("-", en).on(X, nn);
        en.on("-", en).on(W, nn).on(X, nn), V.defaultTransition = J(E);
        var yn = function (n) {
            for (var e = n.replace(/[A-Z]/g, function (n) {
                return n.toLowerCase()
            }), a = n.length, t = [], o = 0; o < a;) {
                for (var r = V, i = null, s = 0, c = null, l = -1; o < a && (i = r.next(e[o]));) r = i, r.accepts() ? (l = 0, c = r) : l >= 0 && l++, s++, o++;
                if (!(l < 0)) {
                    o -= l, s -= l;
                    var u = c.emit();
                    t.push(new u(n.substr(o - s, s)))
                }
            }
            return t
        }, vn = V, kn = Object.freeze({State: m, TOKENS: Y, run: yn, start: vn}), wn = l();
        wn.prototype = {
            type: "token", isLink: !1, toString: function () {
                for (var n = [], e = 0; e < this.v.length; e++) n.push(this.v[e].toString());
                return n.join("")
            }, toHref: function () {
                return this.toString()
            }, toObject: function () {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "http";
                return {type: this.type, value: this.toString(), href: this.toHref(n)}
            }
        };
        var jn = a(wn, l(), {type: "email", isLink: !0}), zn = a(wn, l(), {
                type: "email", isLink: !0, toHref: function () {
                    return "mailto:" + this.toString()
                }
            }), On = a(wn, l(), {type: "text"}), qn = a(wn, l(), {type: "nl"}), Nn = a(wn, l(), {
                type: "url", isLink: !0, toHref: function () {
                    for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "http", e = !1, a = !1, t = this.v, o = [], r = 0; t[r] instanceof S;) e = !0, o.push(t[r].toString().toLowerCase()), r++;
                    for (; t[r] instanceof L;) a = !0, o.push(t[r].toString()), r++;
                    for (; g(t[r]);) o.push(t[r].toString().toLowerCase()), r++;
                    for (; r < t.length; r++) o.push(t[r].toString());
                    return o = o.join(""), e || a || (o = n + "://" + o), o
                }, hasProtocol: function () {
                    return this.v[0] instanceof S
                }
            }), Sn = Object.freeze({Base: wn, MAILTOEMAIL: jn, EMAIL: zn, NL: qn, TEXT: On, URL: Nn}), Tn = function (n) {
                return new f(n)
            }, An = Tn(), Ln = Tn(), Pn = Tn(), En = Tn(), Cn = Tn(), Rn = Tn(), Hn = Tn(), Bn = Tn(Nn), Un = Tn(),
            Mn = Tn(Nn), Dn = Tn(Nn), In = Tn(), Kn = Tn(), _n = Tn(), Gn = Tn(), Yn = Tn(), Qn = Tn(Nn), Wn = Tn(Nn),
            Xn = Tn(Nn), Zn = Tn(Nn), Fn = Tn(), Jn = Tn(), Vn = Tn(), $n = Tn(), ne = Tn(), ee = Tn(), ae = Tn(zn),
            te = Tn(), oe = Tn(zn), re = Tn(jn), ie = Tn(), se = Tn(), ce = Tn(), le = Tn(), ue = Tn(qn);
        An.on(z, ue).on(S, Ln).on(T, Pn).on(L, En), Ln.on(L, En), En.on(L, Cn), An.on(C, Rn).on(x, Rn).on(j, Bn).on(O, Rn), Cn.on(C, Dn).on(x, Dn).on(O, Dn).on(j, Dn), Rn.on(k, Hn), ne.on(k, ee), Hn.on(C, Bn).on(x, Rn).on(O, Rn).on(j, Rn), ee.on(C, ae).on(x, ne).on(O, ne).on(j, ne), Bn.on(k, Hn), ae.on(k, ee), Bn.on(v, Un).on(L, Dn), Un.on(O, Mn), Mn.on(L, Dn), ae.on(v, te), te.on(O, oe);
        var ge = [x, y, j, O, q, N, S, L, C, P, E, G], he = [v, k, A, w, D, I, K, _, H, B, U, M];
        Dn.on(H, Kn).on(B, _n).on(U, Gn).on(M, Yn), In.on(H, Kn).on(B, _n).on(U, Gn).on(M, Yn), Kn.on(D, Dn), _n.on(I, Dn), Gn.on(K, Dn), Yn.on(_, Dn), Qn.on(D, Dn), Wn.on(I, Dn), Xn.on(K, Dn), Zn.on(_, Dn), Fn.on(D, Dn), Jn.on(I, Dn), Vn.on(K, Dn), $n.on(_, Dn), Kn.on(ge, Qn), _n.on(ge, Wn), Gn.on(ge, Xn), Yn.on(ge, Zn), Kn.on(he, Fn), _n.on(he, Jn), Gn.on(he, Vn), Yn.on(he, $n), Qn.on(ge, Qn), Wn.on(ge, Wn), Xn.on(ge, Xn), Zn.on(ge, Zn), Qn.on(he, Qn), Wn.on(he, Wn), Xn.on(he, Xn), Zn.on(he, Zn), Fn.on(ge, Qn), Jn.on(ge, Wn), Vn.on(ge, Xn), $n.on(ge, Zn), Fn.on(he, Fn), Jn.on(he, Jn), Vn.on(he, Vn), $n.on(he, $n), Dn.on(ge, Dn), In.on(ge, Dn), Dn.on(he, In), In.on(he, In), Pn.on(C, re).on(x, re).on(O, re).on(j, re), re.on(ge, re).on(he, ie), ie.on(ge, re).on(he, ie);
        var be = [x, O, q, N, A, P, E, G, C];
        Rn.on(be, se).on(y, ce), Bn.on(be, se).on(y, ce), Hn.on(be, se), se.on(be, se).on(y, ce).on(k, le), le.on(be, se), ce.on(C, ne).on(x, ne).on(j, ae);
        var pe = function (n) {
            for (var e = n.length, a = 0, t = [], o = []; a < e;) {
                for (var r = An, i = null, s = null, c = 0, l = null, u = -1; a < e && !(i = r.next(n[a]));) o.push(n[a++]);
                for (; a < e && (s = i || r.next(n[a]));) i = null, r = s, r.accepts() ? (u = 0, l = r) : u >= 0 && u++, a++, c++;
                if (u < 0) for (var g = a - c; g < a; g++) o.push(n[g]); else {
                    o.length > 0 && (t.push(new On(o)), o = []), a -= u, c -= u;
                    var h = l.emit();
                    t.push(new h(n.slice(a - c, a)))
                }
            }
            return o.length > 0 && t.push(new On(o)), t
        }, me = Object.freeze({State: f, TOKENS: Sn, run: pe, start: An});
        Array.isArray || (Array.isArray = function (n) {
            return "[object Array]" === Object.prototype.toString.call(n)
        });
        var fe = function (n) {
            return pe(yn(n))
        }, de = function (n) {
            for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, a = fe(n), t = [], o = 0; o < a.length; o++) {
                var r = a[o];
                !r.isLink || e && r.type !== e || t.push(r.toObject())
            }
            return t
        }, xe = function (n) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, a = fe(n);
            return 1 === a.length && a[0].isLink && (!e || a[0].type === e)
        };
        e.find = de, e.inherits = a, e.options = b, e.parser = me, e.scanner = kn, e.test = xe, e.tokenize = fe
    }(self.linkify = self.linkify || {})
}();

"use strict";
!function (e, n, t) {
    var i = function (n) {
        function t(e, n, t) {
            var i = t[t.length - 1];
            e.replaceChild(i, n);
            for (var a = t.length - 2; a >= 0; a--) e.insertBefore(t[a], i), i = t[a]
        }

        function i(e, n, t) {
            for (var i = [], a = e, r = Array.isArray(a), o = 0, a = r ? a : a[Symbol.iterator](); ;) {
                var l;
                if (r) {
                    if (o >= a.length) break;
                    l = a[o++]
                } else {
                    if (o = a.next(), o.done) break;
                    l = o.value
                }
                var f = l;
                if ("nl" === f.type && n.nl2br) i.push(t.createElement("br")); else if (f.isLink && n.check(f)) {
                    var s = n.resolve(f), c = s.formatted, u = s.formattedHref, y = s.tagName, d = s.className,
                        m = s.target, k = s.events, h = s.attributes, v = t.createElement(y);
                    if (v.setAttribute("href", u), d && v.setAttribute("class", d), m && v.setAttribute("target", m), h) for (var g in h) v.setAttribute(g, h[g]);
                    if (k) for (var b in k) v.addEventListener ? v.addEventListener(b, k[b]) : v.attachEvent && v.attachEvent("on" + b, k[b]);
                    v.appendChild(t.createTextNode(c)), i.push(v)
                } else i.push(t.createTextNode(f.toString()))
            }
            return i
        }

        function a(e, n, r) {
            if (!e || e.nodeType !== u) throw new Error("Cannot linkify " + e + " - Invalid DOM Node type");
            var o = n.ignoreTags;
            if ("A" === e.tagName || f.contains(o, e.tagName)) return e;
            for (var s = e.firstChild; s;) {
                var d = void 0, m = void 0, k = void 0;
                switch (s.nodeType) {
                    case u:
                        a(s, n, r);
                        break;
                    case y:
                        if (d = s.nodeValue, m = l(d), 0 === m.length || 1 === m.length && m[0] instanceof c) break;
                        k = i(m, n, r), t(e, s, k), s = k[k.length - 1]
                }
                s = s.nextSibling
            }
            return e
        }

        function r(n, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            try {
                i = i || document || e && e.document || global && global.document
            } catch (r) {
            }
            if (!i) throw new Error("Cannot find document implementation. If you are in a non-browser environment like Node.js, pass the document implementation as the third argument to linkifyElement.");
            return t = new s(t), a(n, t, i)
        }

        function o(n) {
            function t(e) {
                return e = r.normalize(e), this.each(function () {
                    r.helper(this, e, i)
                })
            }

            var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            n.fn = n.fn || {};
            try {
                i = i || document || e && e.document || global && global.document
            } catch (a) {
            }
            if (!i) throw new Error("Cannot find document implementation. If you are in a non-browser environment like Node.js, pass the document implementation as the second argument to linkify/jquery");
            "function" != typeof n.fn.linkify && (n.fn.linkify = t, n(i).ready(function () {
                n("[data-linkify]").each(function () {
                    var e = n(this), t = e.data(), i = t.linkify, a = t.linkifyNlbr,
                        o = {nl2br: !!a && 0 !== a && "false" !== a};
                    "linkifyAttributes" in t && (o.attributes = t.linkifyAttributes), "linkifyDefaultProtocol" in t && (o.defaultProtocol = t.linkifyDefaultProtocol), "linkifyEvents" in t && (o.events = t.linkifyEvents), "linkifyFormat" in t && (o.format = t.linkifyFormat), "linkifyFormatHref" in t && (o.formatHref = t.linkifyFormatHref), "linkifyTagname" in t && (o.tagName = t.linkifyTagname), "linkifyTarget" in t && (o.target = t.linkifyTarget), "linkifyValidate" in t && (o.validate = t.linkifyValidate), "linkifyIgnoreTags" in t && (o.ignoreTags = t.linkifyIgnoreTags), "linkifyClassName" in t ? o.className = t.linkifyClassName : "linkifyLinkclass" in t && (o.className = t.linkifyLinkclass), o = r.normalize(o);
                    var l = "this" === i ? e : e.find(i);
                    l.linkify(o)
                })
            }))
        }

        var l = n.tokenize, f = n.options, s = f.Options, c = n.parser.TOKENS.TEXT, u = 1, y = 3;
        r.helper = a, r.normalize = function (e) {
            return new s(e)
        };
        try {
            !(void 0).define && (e.linkifyElement = r)
        } catch (d) {
        }
        return o
    }(n);
    "function" != typeof t.fn.linkify && i(t)
}(window, linkify, jQuery);