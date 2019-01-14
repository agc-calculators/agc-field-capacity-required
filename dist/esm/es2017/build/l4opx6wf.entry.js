/*! Built with http://stenciljs.com */
import { h } from '../agc-field-capacity-required.core.js';

const validate = (form, name) => {
    let el = form.querySelector(`[name="${name}"]`);
    let message = form.querySelector(`[data-validates="${name}"`);
    if (!el.checkValidity()) {
        if (el.className.indexOf('invalid') === -1) {
            el.className += " invalid";
        }
        message.style.display = 'block';
        return false;
    }
    else {
        el.className = el.className.replace(" invalid", "");
        message.style.display = 'none';
    }
    return true;
};
const round = (num, places) => {
    return +(Math.round(new Number(`${num}e+${places}`).valueOf()) + "e-" + places);
};

class AgcFieldCapacityRequired {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.mode = 'step';
        this.units = { land: 'A' };
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-field-capacity-required", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": `fields.land-to-work.${this.units['land']}` }, "Total Land to Work"),
                        h("input", { name: "landToWork", type: "number", min: "0", step: ".01", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.land-to-work.required", "data-validates": "landToWork" }, "Please enter a value."),
                        h("p", { "data-i18n": "hints.land-to-work" }, "\u2BA4 Enter the total acres of land that will be worked.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": `fields.days-to-work` }, "Total Days to Work"),
                        h("input", { name: "daysToWork", type: "number", min: "0", step: "1", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.days-to-work.required", "data-validates": "daysToWork" }, "Please enter a whole number of zero or more."),
                        h("p", { "data-i18n": "hints.days-to-work" }, "\u2BA4 Enter the desired number of days available to work the field.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": `fields.hours-per-day` }, "Total Hours per Day"),
                        h("input", { name: "hoursPerDay", type: "number", min: "1", step: "1", required: true }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.hours-per-day.required", "data-validates": "hoursPerDay" }, "Please enter a whole number greater than zero."),
                        h("p", { "data-i18n": "hints.hours-per-day" }, "\u2BA4 Enter the total number of hours available each day.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-prev", "data-i18n": "actions.prev", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'landToWork')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'daysToWork')) {
                valid = false;
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'hoursPerDay')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let landToWork = parseFloat(this.form.querySelector('[name="landToWork"').value);
        let daysToWork = parseFloat(this.form.querySelector('[name="daysToWork"').value) || 0;
        let hoursPerDay = parseFloat(this.form.querySelector('[name="hoursPerDay"').value);
        let totalHours = round(daysToWork > 0 ? (daysToWork * hoursPerDay) : hoursPerDay, 2);
        let fieldCapacityRequired = round(landToWork / totalHours, 2);
        let landWorkedPerDay = round(fieldCapacityRequired * hoursPerDay, 2);
        let results = {
            socket: this.socket,
            tract: this.tract,
            units: this.units,
            landToWork,
            daysToWork,
            hoursPerDay,
            totalHours,
            fieldCapacityRequired,
            landWorkedPerDay,
            calculated: new Date()
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-field-capacity-required"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

export { AgcFieldCapacityRequired };
