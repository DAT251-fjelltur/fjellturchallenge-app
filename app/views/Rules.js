import { Card, Avatar } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    RefreshControl
} from 'react-native';
import { allRules } from '../services/rules'

function Rules() {
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
                    return (
                        <Card
                            key={i}>
                            {
                                //check rule type and do different stuff
                                rule['ruleType'] == 'TIME RULE' &&
                                <Text>distance rule:</Text>
                            }
                            
                            <Text>name {rule['name']}</Text>
                            <Text>points {rule['basicPoints']}</Text>
                        </Card>
                    )
                })}

            </View>
            :
            <View>
                <Text>loading rules</Text>
            </View>
    )
}
export default Rules;