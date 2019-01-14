/*! Built with http://stenciljs.com */
import { h } from '../agc-field-capacity-required.core.js';

class AgcFieldCapacityRequiredInputs {
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
                    h("h2", { "data-i18n": `fields.land-to-work.${this.data['units']['land']}` }, "Total Land to Work"),
                    h("span", { class: "agc-results__value" }, this.data['landToWork']),
                    h("sub", null, this.data['units']['land'])),
                h("li", null,
                    h("h2", { "data-i18n": `fields.days-to-work` }, "Total Days to Work"),
                    h("span", { class: "agc-results__value" }, this.data['daysToWork']),
                    h("sub", null, "days")),
                h("li", null,
                    h("h2", { "data-i18n": `fields.hours-per-day` }, "Total Hours per Day"),
                    h("span", { class: "agc-results__value" }, this.data['hoursPerDay']),
                    h("sub", null, "hours/day")))))));
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
    static get is() { return "agc-field-capacity-required-inputs"; }
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

export { AgcFieldCapacityRequiredInputs };
