import React from 'react';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RadioButtons as Buttons} from 'react-native-radio-buttons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Text, View} from './Themed';

export type SelectOption = {label: string; value: string};

type Props = {
    value?: SelectOption;
    options: SelectOption[];
    onChange: (value: SelectOption) => void;
}

export default function RadioButtons(props: Props) {
    const {options, value, onChange} = props;

    const selected = (v: string) => {
        const match = options.find(o => o.value === v);
        onChange(match)
    }

    return (
        <View style={{margin: 20}}>
            <RadioForm
                radio_props={options}
                initial={options.length / 2 - 1}
                onPress={selected}
            />
            <Text>Selected option: {value?.label || 'none'}</Text>
        </View>
    );
}
