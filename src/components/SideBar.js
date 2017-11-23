import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content } from 'native-base';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Image
                        style={{ width: 200 }}
                        source={require('../images/pobrane.png')}
                    />
                </Content>
            </Container>
        );
    }
}

export default SideBar;