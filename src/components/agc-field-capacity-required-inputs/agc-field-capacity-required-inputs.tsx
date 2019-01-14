
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-field-capacity-required-inputs'
})
export class AgcFieldCapacityRequiredInputs {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n={`fields.land-to-work.${this.data['units']['land']}`}>Total Land to Work</h2>
                                <span class="agc-results__value">{this.data['landToWork']}</span>
                                <sub>{this.data['units']['land']}</sub>
                            </li>
                            <li>
                                <h2 data-i18n={`fields.days-to-work`}>Total Days to Work</h2>
                                <span class="agc-results__value">{this.data['daysToWork']}</span>
                                <sub>days</sub>
                            </li>
                            <li>
                                <h2 data-i18n={`fields.hours-per-day`}>Total Hours per Day</h2>
                                <span class="agc-results__value">{this.data['hoursPerDay']}</span>
                                <sub>hours/day</sub>
                            </li>                  
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
