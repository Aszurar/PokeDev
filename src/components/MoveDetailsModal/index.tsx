import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components/native';
import { ChevronsRight } from 'react-native-feather';
import {
    Container,
    FieldTextContainer,
    HeaderMain,
    Main,
    ModalContainer,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { IMoveInfo } from '../MovesModal';
import { api } from '../../services/api';
import { MoveDTO } from '../../dtos/MoveDTO';
import { FieldInfoText } from '../FieldInfoText';
import { HeaderModal } from '../HeaderModal';
import { ISetColorandIconByTypeReturn, setColorandIconByType } from '../../utils/setColorandIconByType';
import { ScrollView, View } from 'react-native';
import { Loader } from '../Loader';
import { IconTyoe } from '../IconTyoe';

interface IModal {
    isVisible: boolean;
    onOpen: () => void;
    onClose: () => void;
    moveInfo: IMoveInfo;
}

type IMoveData = Pick<MoveDTO,
    "pp" |
    "type" |
    "power" |
    "accuracy" |
    "damage_class" |
    "effect_chance" |
    "effect_entries" |
    "flavor_text_entries"
>

const defaultMovesData: IMoveData = {
    pp: 0,
    type: {
        name: "",
        url: ""
    },
    power: 0,
    accuracy: 0,
    damage_class: {
        name: "",
    },
    effect_chance: 0,
    effect_entries: [{
        effect: "",
        language: {
            name: "",
        }
    }],
    flavor_text_entries: [{
        flavor_text: "",
        language: {
            name: "",
        },
        version_group: {
            name: "",
        }
    }]

}
export function MoveDetailsModal({
    moveInfo,
    onOpen,
    onClose,
    isVisible,
}: IModal) {

    const theme = useTheme();
    const [moveData, setMoveData] = useState<IMoveData>(defaultMovesData)
    const [isLoading, setisLoading] = useState(true);

    const [describe, setDescribe] = useState("");
    const [effect, setEffect] = useState("");

    const [typeProps, setTypeProps] = useState<ISetColorandIconByTypeReturn>(setColorandIconByType("") as ISetColorandIconByTypeReturn);
    const { icon, color } = typeProps;

    useEffect(() => {
        async function loadMoveInfo() {
            setisLoading(true);
            try {
                const response = await api.get(moveInfo.url.split('v2/')[1]);
                const data = response.data as MoveDTO;
                setMoveData(data);

                setDescribe(data.flavor_text_entries.reverse()
                    .find(item => item.language.name === "en")!
                    .flavor_text);

                setEffect(data.effect_entries.reverse()
                    .find(item => item.language.name === "en")!
                    .effect);

                setTypeProps(setColorandIconByType(data.type.name));
            } catch (err) {
                console.log(err);
            } finally {
                setisLoading(false);

            }
        }
        loadMoveInfo();
    }, [moveInfo])

    return (
        <Container>
            <Modal
                swipeThreshold={200}
                backdropOpacity={0.5}
                isVisible={isVisible}
                onSwipeCancel={onOpen}
                animationInTiming={700}
                animationOutTiming={700}
                propagateSwipe
                onSwipeComplete={onClose}
                swipeDirection={['right']}
                useNativeDriverForBackdrop
                animationIn={"fadeInLeftBig"}
                animationOut={"fadeOutRightBig"}
                style={{
                    margin: 0,
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'flex-end'
                }}
            >
                <ModalContainer>
                    <HeaderModal
                        onClose={onClose}
                        icon={ChevronsRight}
                        iconColor={theme.colors.black}
                        titleColor={theme.colors.black}
                        borderColor={theme.colors.black}
                        backgroundColor={theme.colors.shape}
                        title={moveInfo.name.replace("-", " ")}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <Main
                            onStartShouldSetResponder={() => true}
                        >
                            <HeaderMain>
                                {!isLoading ?
                                    <IconTyoe
                                        icon={icon}
                                        backgroundColor={color}
                                    /> :
                                    <Loader
                                        animationName='pokeball'
                                        width={RFValue(40)}
                                    />

                                }
                                <FieldInfoText
                                    label="Tipo:"
                                    isTextWrap
                                    textField='type'
                                    typeColor={color}
                                    isLoading={isLoading}
                                    text={moveData.type.name}
                                    widthLoad={RFValue(75)}
                                />

                                <FieldInfoText
                                    label="Poder:"
                                    alignText={'center'}
                                    isTextWrap
                                    isLoading={isLoading}
                                    widthLoad={RFValue(60)}
                                    textField={moveData.power === null ? "" : 'status'}
                                    text={moveData.power === null ? "-" : String(moveData.power)}
                                />

                                <FieldInfoText
                                    label="PP:"
                                    alignText={'center'}
                                    isTextWrap
                                    textField='status'
                                    isLoading={isLoading}
                                    text={String(moveData.pp)}
                                    widthLoad={RFValue(60)}
                                />

                                <FieldInfoText
                                    label="Precisão:"
                                    alignText={'center'}
                                    isTextWrap
                                    textField={moveData.accuracy === null ? "" : 'status'}
                                    isLoading={isLoading}
                                    text={moveData.accuracy === null ? "-" : String(moveData.accuracy) + "%"}
                                    widthLoad={RFValue(75)}
                                />
                            </HeaderMain>
                            <FieldTextContainer style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <FieldInfoText
                                    rowDirection
                                    textField={moveData.damage_class ? "status" : ""}
                                    isLoading={isLoading}
                                    label="Tipo de Movimento:"
                                    widthLoad={100}
                                    text={moveData.damage_class ? moveData.damage_class.name : "-"}
                                />
                            </FieldTextContainer>
                            <FieldTextContainer>
                                <FieldInfoText
                                    label="Descrição:"

                                    isLoading={isLoading}
                                    text={describe.replace(/\n/g, " ").replace(/\n\n/g, "\n")}
                                    widthLoad={100}
                                />
                            </FieldTextContainer>

                            <FieldTextContainer >
                                <FieldInfoText
                                    label="Efeito(s):"
                                    isLoading={isLoading}
                                    text={effect.replace(/\$effect_chance/g,
                                        String(moveData.effect_chance))}
                                    widthLoad={100}
                                />
                            </FieldTextContainer>
                        </Main>
                    </ScrollView>
                </ModalContainer>
            </Modal>
        </Container >
    );
}
