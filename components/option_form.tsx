import React from 'react';

import moment from 'moment';

import {Text, StyleSheet, View, Button, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Call, getCalls, getExpirationDates, getMiddleChunk, getMiddleValue, getQuote, Put, RootObject} from '../stocks/types';
import RadioButtons, {SelectOption} from './radio_buttons';
import Yahoo from '../stocks/yahoo';

export type Form = {
    symbol: string;
    expiration: string;
    strike: string;
}

export type Props = {
    form: Form;
    setForm: (form: Form) => void;
};

const epochToDateString = ((epoch: number): string => {
    const m = moment.unix(epoch).local();
    return m.format('MM/DD/YYYY');
});

const fetchOptions = async (symbol: string, expiration?: string): Promise<RootObject> => {
    const yahoo = new Yahoo(fetch);
    const res = await yahoo.fetchOptions(symbol, expiration);
    return res;
}

const OptionForm: React.FC<Props> = (props) => {
    const {form} = props;

    const [optionData, setOptionData] = React.useState<RootObject | null>(null);

    // const items = calls.map((option) => {
    //     const lastPrice = option.lastPrice.fmt;
    //     const strike = option.strike.fmt;

    //     return {
    //         label: `${strike} - ${lastPrice}`,
    //         value: strike,
    //     };
    // });

    // const [radio, setRadio] = React.useState<SelectOption | void>(items.find(opt => opt.value === (middleValue && middleValue.strike.fmt)));

    const setExpiration = (exp: string) => {
        // TODO: fetch option data for this expiration date

        props.setForm({
            ...props.form,
            expiration: exp,
            strike: '',
        });
    }

    const setSymbol = async (symbol: string) => {
        props.setForm({
            symbol,
            expiration: '',
            strike: '',
        });

        // const options = await fetchOptions(symbol);
        // setOptionData(options);
    }

    // const radioItems = getMiddleChunk(quote, items, opt => opt.value);
    // radioItems.reverse();

    // const radioItems = expirationOptions;

    let quote = '';
    if (optionData) {
        quote = getQuote(optionData);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={setSymbol}
                value={form.symbol}
            />
            <Button
                title={'GO!'}
                onPress={() => alert('Yeah!')}
            />
            <Text style={styles.title}>{quote}</Text>
            <Text style={styles.title}>{form.symbol}</Text>
            {/* <RadioButtons
                options={radioItems}
                onChange={(opt) => {
                    setRadio(opt);
                }}
                value={radio}
            /> */}
            <ExpirationSelector
                expiration={form.expiration}
                optionData={optionData}
                setExpiration={setExpiration}
            />
        </View>
    )
}

export default OptionForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

type ExpirationSelectorProps = {
    optionData: RootObject | null;
    expiration: string;
    setExpiration: (exp: string) => void;
}

const ExpirationSelector: React.FC<ExpirationSelectorProps> = (props) => {
    const {optionData, expiration, setExpiration} = props;
    if (!optionData) {
        return null;
    }

    const expirationOptions: SelectOption[] = getExpirationDates(optionData).map((exp) => ({
        label: epochToDateString(exp),
        value: exp.toString(),
    }));

    const selected = expirationOptions.find(opt => opt.value === expiration);

    return (
        <RadioButtons
            options={expirationOptions}
            onChange={(opt) => {
                setExpiration(opt.value);
            }}
            value={selected}
        />
    );
};

/*

const pickerItems = items.map(({label, value}) => (
    <Picker.Item
        key={value}
        value={value}
        label={label}
    />
));

<Picker
    selectedValue={selectedValue}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
    {pickerItems}
</Picker>
*/
