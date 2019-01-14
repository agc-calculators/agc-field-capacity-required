
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils'

@Component({
    tag: 'agc-field-capacity-required'
})
export class AgcFieldCapacityRequired {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @Prop() units: any = { land: 'A' }
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-field-capacity-required" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n={`fields.land-to-work.${this.units['land']}`}>Total Land to Work</label>
                            <input name="landToWork" type="number" min="0" step=".01" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.land-to-work.required" data-validates="landToWork">Please enter a value.</p>
                            <p data-i18n="hints.land-to-work">⮤ Enter the total acres of land that will be worked.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n={`fields.days-to-work`}>Total Days to Work</label>
                            <input name="daysToWork" type="number" min="0" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.days-to-work.required" data-validates="daysToWork">Please enter a whole number of zero or more.</p>
                            <p data-i18n="hints.days-to-work">⮤ Enter the desired number of days available to work the field.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n={`fields.hours-per-day`}>Total Hours per Day</label>
                            <input name="hoursPerDay" type="number" min="1" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.hours-per-day.required" data-validates="hoursPerDay">Please enter a whole number greater than zero.</p>
                            <p data-i18n="hints.hours-per-day">⮤ Enter the total number of hours available each day.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'landToWork')) {
                valid = false
            }
        }

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'daysToWork')) {
                valid = false
            }
        }

        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'hoursPerDay')) {
                valid = false
            }
        }        

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the current tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let landToWork =  parseFloat((this.form.querySelector('[name="landToWork"') as HTMLInputElement).value);        
        let daysToWork =  parseFloat((this.form.querySelector('[name="daysToWork"') as HTMLInputElement).value) || 0;
        let hoursPerDay = parseFloat((this.form.querySelector('[name="hoursPerDay"') as HTMLInputElement).value);

        let totalHours = round(daysToWork > 0 ? (daysToWork * hoursPerDay) : hoursPerDay, 2)

        let fieldCapacityRequired = round(landToWork / totalHours, 2)
        let landWorkedPerDay = round(fieldCapacityRequired  * hoursPerDay, 2)

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
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}