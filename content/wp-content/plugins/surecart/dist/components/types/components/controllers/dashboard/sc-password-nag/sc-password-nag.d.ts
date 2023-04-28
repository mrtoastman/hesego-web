export declare class ScPasswordNag {
  private input;
  open: boolean;
  /** The type of alert. */
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  /** The success url. */
  successUrl: string;
  /** Set a new password */
  set: boolean;
  loading: boolean;
  error: string;
  success: boolean;
  handleSetChange(): void;
  /** Dismiss the form. */
  dismiss(): Promise<void>;
  /** Handle password submit. */
  handleSubmit(e: any): Promise<void>;
  render(): any;
}
