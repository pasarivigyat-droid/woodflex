import React from 'react';
import { useIsMobile } from '../src/hooks/useIsMobile';
import { HouseOwnerMobile } from './house-owner/HouseOwnerMobile';
import { HouseOwnerDesktop } from './house-owner/HouseOwnerDesktop';

export const HouseOwnerView: React.FC = () => {
    const isMobile = useIsMobile();

    return isMobile ? <HouseOwnerMobile /> : <HouseOwnerDesktop />;
};
