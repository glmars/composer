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

const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

require('chai').should();
const chai = require('chai');
chai.use(require('chai-as-promised'));

describe('BusinessNetworkDefinition', () => {

    let modelManager;

    before(() => {
        return BusinessNetworkDefinition.fromDirectory(
            './test/data/bond-network'
        )
        .then((businessNetworkDefinition) => {
            modelManager = businessNetworkDefinition.getModelManager();
        });
    });

    describe('Model Manager', () => {

        it('should count system model file', () => {
            modelManager.getModelFiles().length.should.equal(2);
        });
    });
});