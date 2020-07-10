import React from 'react'
import 'antd/dist/antd.css';
import { Tabs } from 'antd'
import './GraphHolder.css'
import {Graph} from '../Graph/Graph';

export default () => {
    const URL = {
        "data1": 'home',
        "data2": 'office',
        "data3": 'data-center'
    }

    const { TabPane } = Tabs;

    return (
        <div class="tab-graph-component">
            <Tabs defaultActiveKey="1" >
                <TabPane tab={URL.data1} key="1">
                    <Graph data={URL.data1} />
                </TabPane>
                <TabPane tab={URL.data2} key="2">
                    <Graph data={URL.data2} />
                </TabPane>
                <TabPane tab={URL.data3} key="3">
                    <Graph data={URL.data3} />
                </TabPane>
            </Tabs>
        </div>
    )
}
