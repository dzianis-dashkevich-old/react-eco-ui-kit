import PickerComponent from './Picker';
import PaginatorComponent from './Paginator';
import InputComponent from './Input';
import DelimeterComponent from './Delimeter';
import ControlComponent from './Control';
import LabelComponent from './Label';

import * as CORE from './consts/core';
import * as INPUT from './consts/input';
import * as PICKER from './consts/picker';
import * as PAGINATOR from './consts/paginator';
import * as LABELS from './consts/labels';
import * as CONTROLS from './consts/controls';
import * as DELIMETER from './consts/delimeter';

import * as functional from './utils/functional';
import * as paginator from './utils/paginator';
import * as string from './utils/string';

export const Picker = PickerComponent;
export const Paginator = PaginatorComponent;
export const Input = InputComponent;
export const Delimeter = DelimeterComponent;
export const Control = ControlComponent;
export const Label = LabelComponent;

export const consts = { CORE, INPUT, PICKER, PAGINATOR, LABELS, CONTROLS, DELIMETER };
export const utils = { functional, paginator, string };
export const components = { Picker, Paginator, Input, Delimeter, Control, Label };

export default { components, utils, consts };
