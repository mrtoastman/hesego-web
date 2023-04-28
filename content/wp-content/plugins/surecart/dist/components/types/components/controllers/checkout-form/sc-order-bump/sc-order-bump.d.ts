import { EventEmitter } from '../../../../stencil-public-runtime';
import { Bump, Checkout, LineItemData } from '../../../../types';
export declare class ScOrderBump {
  /** The bump */
  bump: Bump;
  /** The checkout */
  checkout: Checkout;
  /** Should we show the controls */
  showControl: boolean;
  /** Add line item event */
  scAddLineItem: EventEmitter<LineItemData>;
  /** Remove line item event */
  scRemoveLineItem: EventEmitter<LineItemData>;
  /** Update the line item. */
  updateLineItem(add: boolean): void;
  newPrice(): any;
  renderInterval(): any;
  renderPrice(): any;
  renderDiscount(): any;
  render(): any;
}
