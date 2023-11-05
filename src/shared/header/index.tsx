import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import ProfileImage from '../profileImage';
import SearchBox from '../searchbox';
import CloseIcon from 'src/assets/close-icon.svg';
import BellIcon from 'src/assets/notification-icon.svg';
import { useAppDispatch } from 'src/hooks';
import { onSearchChange } from 'src/reducers/client';
import { NotificationSelectors } from 'src/reducers/notification';
import { Colors } from 'src/utils/colors';

import { NotificationItem } from './components';

interface PopUpModel {
    hidden: boolean;
}

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    background: transparent;
`;

const Container = styled.div`
    display: flex;
    margin-left: auto;
    margin: 45px 40px 0 auto;
`;

const PopUp = styled.div`
    background: #fff;
    position: absolute !important;
    width: 400px;
    height: 622px;
    right: 100px;
    top: 100px;
    border: 1px solid ${Colors.theme.light_sky_blue};
    border-radius: 1em;
    display: ${(p: PopUpModel) => (p.hidden ? 'none' : 'block')};
    z-index: 11;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const NotificationHeader = styled.div`
    background: ${Colors.theme.primaryLight};
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    padding: 15px 12px;
    position: sticky;
    display: flex;
    justify-content: space-between;
    z-index: 999;
    top: 0;
`;

const HeaderText = styled.span`
    font-weight: 500;
    font-size: 1.1em;
`;

const HeaderIcon = styled.img`
    cursor: pointer;
`;

const SearchDiv = styled.div`
    margin: 40px 0 0 40px;
`;

const NotificationDiv = styled.div`
    width: 48px;
    height: 48px;
    background-color: ${Colors.extra.white};
    border-radius: 57px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    cursor: pointer;
`;

const NotificationDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${Colors.theme.primary};
    position: absolute;
    right: 0;
    top: -5px;
    border-radius: 100%;
    color: ${Colors.extra.white};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
`;

const NotificationIcon = styled.img`
    width: 15px;
    height: 18px;
`;

const ProfileAvatar = styled(ProfileImage)`
    width: 48px;
    height: 48px;
`;

interface Props {
    handleToggle?: () => void;
    handleScroll?: () => void;
    hidden?: boolean;
    onClose?: () => void;
}

const Header: FunctionComponent<Props> = ({
    handleToggle,
    handleScroll,
    hidden = false,
    onClose
}) => {
    const dispatch = useAppDispatch();
    const { notifications, unreadCount } = NotificationSelectors();
    const { list } = notifications;

    return (
        <HeaderContainer>
            <SearchDiv>
                <SearchBox
                    onChange={(value) => {
                        dispatch(onSearchChange(value));
                    }}
                />
            </SearchDiv>
            <Container>
                <NotificationDiv onClick={handleToggle}>
                    {unreadCount > 0 && (
                        <NotificationDot>{unreadCount}</NotificationDot>
                    )}
                    <NotificationIcon src={BellIcon} />
                </NotificationDiv>
                <ProfileAvatar width={48} height={48} />
            </Container>
            <PopUp hidden={hidden} onScroll={handleScroll}>
                <>
                    <NotificationHeader>
                        <HeaderText>Notifications</HeaderText>
                        <HeaderIcon
                            src={CloseIcon}
                            alt="Bell Icon"
                            role="button"
                            onClick={onClose}
                        />
                    </NotificationHeader>
                    {list?.map((item, key) => (
                        <NotificationItem
                            key={key}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            dateTime={item.date_time}
                            type={item.type}
                            payload={item.payload}
                            read={item.read_flag}
                        />
                    ))}
                </>
            </PopUp>
        </HeaderContainer>
    );
};

export default Header;