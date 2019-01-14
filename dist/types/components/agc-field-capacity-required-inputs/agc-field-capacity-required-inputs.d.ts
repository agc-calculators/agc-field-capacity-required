import '../../stencil.core';
export declare class AgcFieldCapacityRequiredInputs {
    socket: string;
    data: any;
    ready: boolean;
    section: HTMLElement;
    render(): JSX.Element;
    handleResults(e: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
}
