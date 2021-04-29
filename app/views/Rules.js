import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    RefreshControl
} from 'react-native';
import { allRules } from '../services/rules'

function Rules() {
    // return (<Text>abc</Text>);
    const [ruleList, setRuleList] = useState([]);
    useEffect(() => {
        allRules().then(val => {
            let rules = val['content'];
            setRuleList(rules);
            console.log(ruleList);
        })
    }, [])
    return (
        ruleList.length > 0 ?
            <View>
                <Text>All rules:</Text>
                {ruleList.map((rule, i) => {
                    console.log(rule['name']);
                    <>
                        <Text>name {rule['name']}</Text>
                        <Text>points {rule['basicPoints']}</Text>
                    </>
                })}

            </View>
            :
            <View>
                <Text>loading rules</Text>
            </View>
    )
}
export default Rules;