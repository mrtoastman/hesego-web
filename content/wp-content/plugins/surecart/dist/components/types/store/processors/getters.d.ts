/**
 * Gets a sorted array of available processors based on
 * checkout mode, recurring requirements, and if mollie is enabled.
 */
export declare const availableProcessors: () => any;
/**
 * Gets an available processor type.
 */
export declare const getAvailableProcessor: (type: string) => any;
/**
 * Get a sorted array of manual payment methods
 * based on recurring requirements.
 */
export declare const availableManualPaymentMethods: () => any;
/**
 * Get a sorted array of mollie payment method types.
 */
export declare const availableMethodTypes: () => any;
/**
 * Get a combined available processor choices (processors + manual payment methods)
 */
export declare const availableProcessorChoices: () => any[];
/**
 * Do we have multiple processors.
 */
export declare const hasMultipleProcessorChoices: () => boolean;
/**
 * Get a combined available payment methods (method types + manual payment methods)
 */
export declare const availableMethodChoices: () => any[];
/**
 * Do we have multiple payment methods.
 */
export declare const hasMultipleMethodChoices: () => boolean;
