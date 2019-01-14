export class AgcFieldCapacityRequiredResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.field-capacity-required" }, "Field Capacity Required"),
                    h("span", { class: "agc-results__value" }, this.data['fieldCapacityRequired']),
                    h("sub", null,
                        this.data['units']['land'],
                        "/hour")),
                h("li", null,
                    h("h2", { "data-i18n": "results.land-worked-per-day" }, "Land Worked per Day"),
                    h("span", { class: "agc-results__value" }, this.data['landWorkedPerDay']),
                    h("sub", null,
                        this.data['units']['land'],
                        "/day")))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-field-capacity-required-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}
