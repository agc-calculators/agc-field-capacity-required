
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-field-capacity-required-results-placeholder'
})
export class AgcFieldCapacityRequiredResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.field-capacity-required">Field Capacity Required</h2>
                        {placeholder()}
                    </li>  
                    <li>
                        <h2 data-i18n="results.field-capacity-per-day">Field Capacity Required per Day</h2>
                        {placeholder()}
                    </li>                                      
                </ul>
            </section>
        );
    }
}