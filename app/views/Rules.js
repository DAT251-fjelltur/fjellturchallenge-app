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
                {ruleList.map((rule, i) => {
                    return (
                        <Card
                            key={i}>
                            {
                                //check rule type and do different stuff
                                rule['ruleType'] == 'TIME RULE' &&
                                <Text>distance rule:</Text>
                            }

                            {
                                //check rule type and do different stuff
                                rule['ruleType'] == 'MOUNTAIN RULE' &&
                                <Text>Walk to:</Text>
                            }
                            <>
                                <Text style={{ fontSize:20}}> {rule['name']}</Text>
                            <Text style={{ fontWeight: "bold" }}> Points awarded: {rule['basicPoints']}</Text>
                            </>
                        </Card>
                    )
})}

            </View >
            :
<Card>
    <Text>Loading rules</Text>
</Card>
    )
}
export default Rules;