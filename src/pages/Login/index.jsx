import { MdEmail, MdLock } from 'react-icons/md';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Column, Container, CriarText, EsqueciSenhaText, Row, SubtitleLogin, Title, TitleLogin, Wrapper } from "./styles";

import { Input } from "../../components/Input";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';

const schema = yup.object({
    email: yup.string().email('Email não é válido').required('Campo obrigatório'),
    password: yup.string().min(3, 'No mínimo 3 caracteres.').required('Campo obrigatório')
}).required();

const Login = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`users?email=${formData.email}&senha=${formData.password}`)

            if(data.length && data[0].id){
                navigate('/feed');
                return;
            } else {
                alert('E-mail ou Senha inválido');
            }
        } catch {
            alert('Houve um erro na consulta, tente novamente');
        }
    }

    return (<>
        <Header autenticado={false} />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="email" control={control} errorMessage={errors?.email?.message} placeholder="E-Mail" leftIcon={<MdEmail />}/>
                        <Input name="password" control={control} errorMessage={errors?.password?.message} placeholder="Senha" type="password" leftIcon={<MdLock />}/>

                        <Button title="Entrar" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <EsqueciSenhaText>Esqueci minha senha</EsqueciSenhaText>
                        <CriarText>Criar Conta</CriarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login };
