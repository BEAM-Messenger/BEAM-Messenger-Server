<?php
/**
 * Super admin thingy cause of my current server situation
 */
$app->group('/wormhole/{access_token}', function () {
    $this->get('/verify/{user_id}', 'UserFrosting\Sprinkle\Admin\Controller\WormholeController:verify');
});
