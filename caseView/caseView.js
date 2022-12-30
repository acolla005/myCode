import { LightningElement } from 'lwc';
import getCases from '@salesforce/apex/CaseViewController.getCases';

export default class CaseView extends LightningElement {
    caseData;
    recordTypes;
    categories;
    statuses;

    caseColumns = [
        { label: 'Case Number', fieldName: 'RecordName', type: 'url', typeAttributes: { label: { fieldName: 'CaseNumber' }, target: '_blank'}, sortable: "true"},
        { label: "Record Type", fieldName: "RecordTypeName", editable : false },
        { label: "Category", fieldName: "Category__c", editable : false },
        { label: "Status", fieldName: "Status", editable : false }
    ]

    connectedCallback()
    {
        getCases(/*{recordTypeIdSet : recordTypes, categorySet : categories, statusSet : statuses}*/).then(result => {
            let tempRecs = [];
            result.forEach(record => {
                let tempRec = Object.assign( {}, record );
                tempRec.RecordName = '/' + tempRec.Id;
                tempRec.RecordTypeName = tempRec.RecordType.DeveloperName;
                tempRecs.push( tempRec );
            });
            this.caseData = tempRecs;
        });
    }
}