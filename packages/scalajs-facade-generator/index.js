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
const debug = require('debug')('scalajs:facade:generator');

BusinessNetworkDefinition.fromDirectory(
    './test/data/bond-network'
)
.then((businessNetworkDefinition) => {
    return businessNetworkDefinition.getModelManager();
})
.then((modelManager) => {

    const includeSystemType = false;

    console.log('Assets:');
    modelManager.getAssetDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
        ScalajsFacadeGenerator.printDeclaration(decl);
    });

    console.log('Participant:');
    modelManager.getParticipantDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
        ScalajsFacadeGenerator.printDeclaration(decl);
    });

    console.log('Transaction:');
    modelManager.getTransactionDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
        ScalajsFacadeGenerator.printDeclaration(decl);
    });

    console.log('Event:');
    modelManager.getEventDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
        ScalajsFacadeGenerator.printDeclaration(decl);
    });

    console.log('Concept:');
    modelManager.getConceptDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
        ScalajsFacadeGenerator.printDeclaration(decl);
    });

    console.log('Enum:');
    modelManager.getEnumDeclarations(includeSystemType).forEach(function(decl) {
        console.log(decl.getFullyQualifiedName());
    });

    process.exit(0);
});

/**
 * Scala.js facade generator
 *
 * @class
 */
class ScalajsFacadeGenerator {

    /**
     * Print class decalaration
     *
     * @param {ClassDeclaration} classDeclaration Class declaration
     */
    static printDeclaration(classDeclaration) {
        console.log('{');
        classDeclaration.getProperties().forEach(function(prop) {
            const propType = ScalajsFacadeGenerator.toScalaType(prop.getType());
            const propTypeArray = prop.isArray() ? `js.Array[${propType}]` : propType;
            const propTypeWithDecorators = prop.isOptional() ? `js.UndefOr[${propTypeArray}]` : propTypeArray;
            console.log(`   var ${prop.getName()}: ${propTypeWithDecorators} = js.native`);
        });
        console.log('}');
    }

    /**
     * Converts a Composer type to a Scala.js type. Primitive types are converted
     * everything else is passed through unchanged.
     * @param {string} type  - the composer type
     * @return {string} the corresponding type in Scala.js
     * @private
     */
    static toScalaType(type) {
        switch(type) {
        case 'DateTime':
            return 'js.Date';
        case 'Boolean':
            return 'Boolean';
        case 'String':
            return 'String';
        case 'Double':
            return 'Double';
        case 'Long':
            return 'Long';
        case 'Integer':
            return 'Int';
        default:
            return type;
        }
    }
}