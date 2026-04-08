import React from 'react';
import { useIsMobile } from '../src/hooks/useIsMobile';
import { ArchitectMobile } from './architect/ArchitectMobile';
import { ArchitectDesktop } from './architect/ArchitectDesktop';

export const ArchitectView: React.FC = () => {
    const isMobile = useIsMobile();

    return isMobile ? <ArchitectMobile /> : <ArchitectDesktop />;
};
