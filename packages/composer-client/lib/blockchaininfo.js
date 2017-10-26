/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Util = require('composer-common').Util;

/**
 * @class
 * @memberof module:composer-client
 */
class BlockchainInfo {

    /**
     * Get an existing BlockchainInfo.
     *
     * @param {SecurityContext} securityContext The user's security context.
     * @return {Promise} A promise that will be resolved to BlockchainInfo
     */
    static getBlockchainInfo(securityContext) {
        Util.securityCheck(securityContext);
        return Promise.resolve(new BlockchainInfo(securityContext));
    }

    /**
     * Create a BlockchainInfo.
     * <strong>Note: Only to be called by framework code. Applications should
     * retrieve instances from {@link BusinessNetworkConnection}</strong>
     * </p>
     *
     * @param {SecurityContext} securityContext The user's security context.
     * @private
     */
    constructor(securityContext) {
        this.securityContext = securityContext;
    }

    /**
     * Get various useful information on the state of the Blockchain
     *
     * @return {Promise} A promise that will be resolved to Blockchain info
     */
    getInfo() {
        Util.securityCheck(this.securityContext);
        return this.securityContext.getConnection().queryInfo();
    }
}

module.exports = BlockchainInfo;
