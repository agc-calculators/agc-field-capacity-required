/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';




export namespace Components {

  interface AgcFieldCapacityRequiredInputs {
    'socket': string;
  }
  interface AgcFieldCapacityRequiredInputsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcFieldCapacityRequiredProgress {
    'socket': string;
  }
  interface AgcFieldCapacityRequiredProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcFieldCapacityRequiredResultsPlaceholder {}
  interface AgcFieldCapacityRequiredResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcFieldCapacityRequiredResults {
    'socket': string;
  }
  interface AgcFieldCapacityRequiredResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcFieldCapacityRequired {
    'mode': 'full' | 'step';
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcFieldCapacityRequiredAttributes extends StencilHTMLAttributes {
    'mode'?: 'full' | 'step';
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcFieldCapacityRequiredInputs': Components.AgcFieldCapacityRequiredInputs;
    'AgcFieldCapacityRequiredProgress': Components.AgcFieldCapacityRequiredProgress;
    'AgcFieldCapacityRequiredResultsPlaceholder': Components.AgcFieldCapacityRequiredResultsPlaceholder;
    'AgcFieldCapacityRequiredResults': Components.AgcFieldCapacityRequiredResults;
    'AgcFieldCapacityRequired': Components.AgcFieldCapacityRequired;
  }

  interface StencilIntrinsicElements {
    'agc-field-capacity-required-inputs': Components.AgcFieldCapacityRequiredInputsAttributes;
    'agc-field-capacity-required-progress': Components.AgcFieldCapacityRequiredProgressAttributes;
    'agc-field-capacity-required-results-placeholder': Components.AgcFieldCapacityRequiredResultsPlaceholderAttributes;
    'agc-field-capacity-required-results': Components.AgcFieldCapacityRequiredResultsAttributes;
    'agc-field-capacity-required': Components.AgcFieldCapacityRequiredAttributes;
  }


  interface HTMLAgcFieldCapacityRequiredInputsElement extends Components.AgcFieldCapacityRequiredInputs, HTMLStencilElement {}
  var HTMLAgcFieldCapacityRequiredInputsElement: {
    prototype: HTMLAgcFieldCapacityRequiredInputsElement;
    new (): HTMLAgcFieldCapacityRequiredInputsElement;
  };

  interface HTMLAgcFieldCapacityRequiredProgressElement extends Components.AgcFieldCapacityRequiredProgress, HTMLStencilElement {}
  var HTMLAgcFieldCapacityRequiredProgressElement: {
    prototype: HTMLAgcFieldCapacityRequiredProgressElement;
    new (): HTMLAgcFieldCapacityRequiredProgressElement;
  };

  interface HTMLAgcFieldCapacityRequiredResultsPlaceholderElement extends Components.AgcFieldCapacityRequiredResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcFieldCapacityRequiredResultsPlaceholderElement: {
    prototype: HTMLAgcFieldCapacityRequiredResultsPlaceholderElement;
    new (): HTMLAgcFieldCapacityRequiredResultsPlaceholderElement;
  };

  interface HTMLAgcFieldCapacityRequiredResultsElement extends Components.AgcFieldCapacityRequiredResults, HTMLStencilElement {}
  var HTMLAgcFieldCapacityRequiredResultsElement: {
    prototype: HTMLAgcFieldCapacityRequiredResultsElement;
    new (): HTMLAgcFieldCapacityRequiredResultsElement;
  };

  interface HTMLAgcFieldCapacityRequiredElement extends Components.AgcFieldCapacityRequired, HTMLStencilElement {}
  var HTMLAgcFieldCapacityRequiredElement: {
    prototype: HTMLAgcFieldCapacityRequiredElement;
    new (): HTMLAgcFieldCapacityRequiredElement;
  };

  interface HTMLElementTagNameMap {
    'agc-field-capacity-required-inputs': HTMLAgcFieldCapacityRequiredInputsElement
    'agc-field-capacity-required-progress': HTMLAgcFieldCapacityRequiredProgressElement
    'agc-field-capacity-required-results-placeholder': HTMLAgcFieldCapacityRequiredResultsPlaceholderElement
    'agc-field-capacity-required-results': HTMLAgcFieldCapacityRequiredResultsElement
    'agc-field-capacity-required': HTMLAgcFieldCapacityRequiredElement
  }

  interface ElementTagNameMap {
    'agc-field-capacity-required-inputs': HTMLAgcFieldCapacityRequiredInputsElement;
    'agc-field-capacity-required-progress': HTMLAgcFieldCapacityRequiredProgressElement;
    'agc-field-capacity-required-results-placeholder': HTMLAgcFieldCapacityRequiredResultsPlaceholderElement;
    'agc-field-capacity-required-results': HTMLAgcFieldCapacityRequiredResultsElement;
    'agc-field-capacity-required': HTMLAgcFieldCapacityRequiredElement;
  }


}
