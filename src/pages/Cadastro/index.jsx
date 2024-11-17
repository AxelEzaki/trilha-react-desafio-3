import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Column, Container, FacaLoginText, JaTenhoContaText, Row, SubtitleCadastro, Title, TitleCadastro, Wrapper } from "./styles";

import { Input } from "../../components/Input";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';

const schema = yup.object({
    email: yup.string().email('Email não é válido').required('Campo obrigatório'),
    password: yup.string().min(3, 'No mínimo 3 caracteres.').required('Campo obrigatório'),
    nome: yup.string().min(5, 'No mínimo 5 caracteres.').required('Campo obrigatório')
}).required();

const Cadastro = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid }} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (formData) => {
        try {
            const jsonParsed = JSON.stringify({ "email": formData.email, "senha": formData.password, "name": formData.nome })
            const response = await api.post(`users`, jsonParsed, {
                headers: { "Content-Type": "application/json" }
              })

            const { data } = response;

            if(data && data.id){
                alert('Usuário cadastrado com sucesso');
                navigate('/feed');
                return;
            } else {
                alert('E-mail ou Senha inválido');
            }
        } catch {
            alert('Houve um erro ao gravar, tente novamente');
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
                    <TitleCadastro>Comece agora grátis</TitleCadastro>
                    <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="nome" control={control} errorMessage={errors?.nome?.message} placeholder="Nome Completo" leftIcon={<MdPerson />}/>
                        <Input name="email" control={control} errorMessage={errors?.email?.message} placeholder="E-mail" leftIcon={<MdEmail />}/>
                        <Input name="password" control={control} errorMessage={errors?.password?.message} placeholder="Password" type="password" leftIcon={<MdLock />}/>

                        <Button title="Criar minha Conta" type="submit" variant="secondary" />
                    </form>
                    <Row>
                        <JaTenhoContaText>Já tenho conta.</JaTenhoContaText>
                        <FacaLoginText>&nbsp;Fazer login</FacaLoginText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro };
