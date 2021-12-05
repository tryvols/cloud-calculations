import { observable, computed, action } from 'mobx';
import { DataStore } from "./data-store";
import { ValidDataStoreOptions } from './types';
import { ValidationRule } from '../validation/types';

export class ValidDataStore<T> extends DataStore<T> {
  private readonly validationRules: ReadonlyArray<ValidationRule<T>>;

  constructor(value: T, options: ValidDataStoreOptions<T>) {
    super(value, options);
    this.validationRules = options.validationRules || [];
  }

  @observable
  private _error?: string;

  @computed
  get valid(): boolean {
    return !this._error;
  }

  @computed
  get error(): string | undefined {
    return this._error;
  }

  @action
  set(value: T): void {
    super.set(value);
    this.validate();
  }

  @action
  setError(error: string): void {
    this._error = error;
  }

  @action
  validate(): boolean {
    const errors = this.validationRules.filter(
      rule => rule.condition(this.value),
    );
    this._error = errors?.[0]?.error;
    return this.valid;
  }

  @action
  reset(): void {
    this._error = undefined;
    super.reset();
  }
}