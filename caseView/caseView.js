import { LightningElement } from 'lwc';
import getCases from '@salesforce/apex/CaseViewController.getCases';

export default class CaseView extends LightningElement {
    caseData;
    recordTypes;
    statuses;

    caseColumns = [
        { label: 'Case Number', fieldName: 'RecordName', type: 'url', typeAttributes: { label: { fieldName: 'CaseNumber' }, target: '_blank'}, sortable: "true"},
        { label: "Status", fieldName: "Status", editable : false }
    ]

    connectedCallback()
    {
        getCases().then(result => {
            let tempRecs = [];
            result.forEach(record => {
                let tempRec = Object.assign( {}, record );
                tempRec.RecordName = '/' + tempRec.Id;
                tempRecs.push( tempRec );
            });
            this.caseData = tempRecs;
        });
    }
}
