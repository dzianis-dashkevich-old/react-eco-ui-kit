# React-eco-ui-kit

[![Build Status](https://travis-ci.org/DenisDashkevich/react-eco-ui-kit.svg?branch=master)](https://travis-ci.org/DenisDashkevich/react-eco-ui-kit)
[![codecov](https://codecov.io/gh/DenisDashkevich/react-eco-ui-kit/branch/master/graphs/badge.svg)](https://codecov.io/gh/DenisDashkevich/react-eco-ui-kit)


### Components:
* ### Paginator


| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| amount      | number.isRequered | --- | All items
| valuePerPage      | number      |  `10` | Items per one page
| amountPickersToShow | number      | `4` | Pickers to show in the Paginator
| onPickerChange | func | `noop` | function to trigger after picker change
| initIndex | number | `1` | start picked index
| className | string | `EMPTY` | class name for the Paginator wrapper
| customPickerComponent | React.Component | `Picker` | Picker component
| pickerClassName | string | `EMPTY` | provided class name for the Picker component
| enableDelimeter | bool | `true` | Flag to toggle delimeter visibility
| customDelimeterComponent | React.Component | `Delimeter` | Delimeter component
| delimeterValue | string | `...` | Delimeter value to show
| delimeterClassName | string | `EMPTY` | provided class name for the Delimeter component
| enableLabels | bool | `true` | Flag to toggle labels visibility
| customLabelComponent | React.Component | `Label` | Label Component
| firstLabel | string | `First` | Value for first label
| lastLabel | string | `Last` | Value for last label
| labelClassName | strings | `EMPTY` | provided class name for the Label component
| enableControls | bool | `true` | Flag to toggle controls visibility
| customControlComponent | React.Component | `Control` | Control component
| controlUp | any |  `>` | Value for control up
| controlDown | any | `<` | Value for control down
| controlClassName | string | `EMPTY` | provided class name for the Control component
| enableInputControl | bool | `true` | Flag to toggle input visibility
| customInputComponent | React.Component | `Input` | Input component
| inputControlValidator | func | --- | function to validate input values. Will trigger on each change.
| inputClassName | string | `EMPTY` | provided class name for the Input component

##### Usage:

```javascript
const renderPaginator = (amount) => (<Paginator amount={amount} />);
const myData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //your data

renderPaginator(myData.length);
```

* ### Delimeter
| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| className      | string | `EMPTY` | provided class name for the Delimeter component
| value | any | `...` | Delimeter value to show

##### Usage:

```javascript
const renderDelimeter = (props) => (<Delimeter {...props} />);

renderDelimeter({ value: '---', className: 'myDelimeter' });
```

* ### Control
| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| className      | string | `EMPTY` | provided class name for the Control component
| value | any | `def` | Control value to show
| disabled | bool | `false` | Flag to toggle availability of the Control
| onClick | func | `noop` | click handler

##### Usage:

```javascript
const renderControl = (props) => (<Control {...props} />);

renderControl({ value: '->', className: 'myControl' });
```

* ### Label
| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| className      | string | `EMPTY` | provided class name for the Label component
| value | any | `def` | Label value to show
| disabled | bool | `false` | Flag to toggle availability of the Label
| onClick | func | `noop` | click handler

##### Usage:

```javascript
const renderLabel = (props) => (<Label {...props} />);

renderLabel({ value: 'FIRST', className: 'myLabel' });
```

* ### Picker
| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| className      | string | `EMPTY` | provided class name for the Picker component
| value | any | `def` | Picker value to show
| disabled | bool | `false` | Flag to toggle availability of the Picker
| picked | bool | `false` | Flag to toggle picked state of the Picker
| onClick | func | `noop` | click handler

##### Usage:
```javascript
const renderPicker = (props) => (<Picker {...props} />);

renderPicker({ value: '22', className: 'myPicker' });
```

* ### Input
| Name         | Type         | Default | Description |
|:-------------:|:-------------:|:-----:|:------------:|
| className      | string | `EMPTY` | provided class name for the Input component
| value | string | `def` | Input value to show
| validator | func | `identity` | function to validate input values. Will trigger on each change.
| onChange | func | `noop` | change handler

##### Usage:

```javascript
const renderInput = (props) => (<Input {...props} />);

renderInput({ value: '22', className: 'myInput' });
```
