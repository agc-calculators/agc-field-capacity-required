/*! Built with http://stenciljs.com */
import { h } from '../agc-field-capacity-required.core.js';

class AgcFieldCapacityRequiredResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.field-capacity-required" }, "Field Capacity Required"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.field-capacity-per-day" }, "Field Capacity Required per Day"),
                    placeholder()))));
    }
    static get is() { return "agc-field-capacity-required-results-placeholder"; }
}

export { AgcFieldCapacityRequiredResultsPlaceholder };
