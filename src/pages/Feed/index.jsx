import React from "react";

import { Card } from "../../components/Card";
import { UserInfo } from "../../components/UserInfo";
import { Header } from "../../components/Header";
import { TitleHighlight, Title, Column, Container } from "./styles";

const Feed = () => {
    return (<>
        <Header autenticado={true} />
        <Container>
            <Column flex={3}>
                <Title>Feed</Title>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Column>
            <Column flex={1}>
                <TitleHighlight># RANKING 5 TOP DA SEMANA</TitleHighlight>
                <UserInfo percentual={43} nome="Axel Ezaki" image="https://avatars.githubusercontent.com/u/83423673?v=4" />
                <UserInfo percentual={35} nome="Axel Ezaki" image="https://avatars.githubusercontent.com/u/83423673?v=4" />
                <UserInfo percentual={21} nome="Axel Ezaki" image="https://avatars.githubusercontent.com/u/83423673?v=4" />
                <UserInfo percentual={89} nome="Axel Ezaki" image="https://avatars.githubusercontent.com/u/83423673?v=4" />
                <UserInfo percentual={4} nome="Axel Ezaki" image="https://avatars.githubusercontent.com/u/83423673?v=4" /> 
            </Column>
        </Container>
    </>)
}

export { Feed };