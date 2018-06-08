<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */

namespace UserFrosting\Sprinkle\Core\Database\Relations;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use UserFrosting\Sprinkle\Core\Database\Relations\Concerns\Unique;

/**
 * A BelongsToMany relationship that reduces the related members to a unique (by primary key) set.
 *
 * @author Alex Weissman (https://alexanderweissman.com)
 * @link https://github.com/laravel/framework/blob/5.4/src/Illuminate/Database/Eloquent/Relations/BelongsToMany.php
 */
class BelongsToManyUnique extends BelongsToMany
{
    use Unique;
}
