import * as React from 'react';
import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import OptionForm, {Form} from '../components/option_form';
import {Text, View} from '../components/Themed';
import {getCalls, RootObject} from '../stocks/types';
import Yahoo from '../stocks/yahoo';

export default function TabOneScreen() {
    const [data, setData] = React.useState<RootObject | null>(null);
    const [fetchOptions, setFetchOptions] = React.useState<RootObject | null>(null);

    const [form, setForm] = React.useState<Form>({
        symbol: '',
        expiration: '',
        strike: '',
    })

    // if (!data) {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.title}>Loading</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading</Text>
            <OptionForm
                form={form}
                setForm={setForm}
            />
        </View>
    );
}

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
