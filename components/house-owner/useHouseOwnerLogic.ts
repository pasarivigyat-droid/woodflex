import { useState, useMemo, useEffect } from 'react';
import { products, Product, RoomCategory, shuffleArray, getRemoteProducts } from '../../src/data/products';
import { trackEvent, getLeadId } from '../../src/utils/analytics';
import { supabase } from '../../src/lib/supabase';

const ROOM_CATEGORY_FLOW = {
    living: ["sofa", "lounge_chair", "center_table", "planter"] as const,
    dining: ["dining_table", "dining_chair"] as const,
};

const WHATSAPP_NUMBER = "919429004803";

export function useHouseOwnerLogic() {
    const [roomType, setRoomType] = useState<"living" | "dining" | null>(null);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [likedByCategory, setLikedByCategory] = useState<Partial<Record<RoomCategory, string[]>>>({});
    const [showShortlist, setShowShortlist] = useState(false);
    const [userData, setUserData] = useState({ name: '', city: '', contact: '' });
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [liveProducts, setLiveProducts] = useState<Product[]>(products);

    useEffect(() => {
        getRemoteProducts().then(setLiveProducts);
    }, []);

    // 1. Shuffled Products for current session
    const shuffledProducts = useMemo(() => {
        // Shuffle the live products for the house owner
        return shuffleArray(liveProducts);
    }, [liveProducts]);

    const flow = roomType ? ROOM_CATEGORY_FLOW[roomType] : [];
    const currentCategory = flow[categoryIndex];

    const handleCategoryDone = (category: RoomCategory, likedIds: string[]) => {
        setLikedByCategory(prev => ({
            ...prev,
            [category]: likedIds,
        }));

        trackEvent("houseowner_wave_done", {
            roomType,
            category,
            likedCount: likedIds.length,
            waveIndex: categoryIndex
        });

        if (categoryIndex + 1 < flow.length) {
            setCategoryIndex(prev => prev + 1);
        } else {
            setShowShortlist(true);
        }
    };

    const handleWhatsAppShortlist = async () => {
        if (!userData.name || !userData.city || !userData.contact) {
            alert("Please fill in all details (Name, City, and WhatsApp) to proceed.");
            return;
        }

        setIsSaving(true);
        const existingId = getLeadId();
        const likedEntries = Object.entries(likedByCategory) as [RoomCategory, string[]][];

        try {
            trackEvent("houseowner_shortlist_confirmed", { roomType, likedByCategory });

            const leadRecord: any = {
                full_name: userData.name,
                city: userData.city,
                phone: userData.contact,
                room_type: roomType,
                shortlist: likedByCategory,
                source: 'HouseOwnerSwipeFlow',
                persona: 'houseowner'
            };

            if (existingId) leadRecord.id = existingId;

            const { error } = await supabase.from('leads').upsert([leadRecord]);
            if (error) throw error;
        } catch (err) {
            console.error('Error saving lead to Supabase:', err);
        } finally {
            setIsSaving(false);
        }

        const shortlistText = likedEntries.map(([cat, ids]) => {
            const items = ids?.map(id => {
                const p = products.find(p => p.id === id);
                return `• ${p?.title} (ID: ${id})`;
            }).join('\n');
            return `\n*${cat.toUpperCase()}*\n${items || 'No items selected'}`;
        }).join('\n');

        const message = `Hi Woodflex Designs, I've shortlisted these items for my ${roomType} using the Swipe Flow:\n${shortlistText}\n\nMy Details:\nName: ${userData.name}\nCity: ${userData.city}\nContact: ${userData.contact}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
    };

    const handleDownloadTxt = () => {
        const likedEntries = Object.entries(likedByCategory) as [RoomCategory, string[]][];
        const content = likedEntries.map(([cat, ids]) => {
            const items = ids?.map(id => {
                const p = products.find(p => p.id === id);
                return `- ${p?.title} (${id})`;
            }).join('\n');
            return `\n[ ${cat.toUpperCase()} ]\n${items || 'No items selected'}`;
        }).join('\n');

        const date = new Date().toLocaleDateString();
        const header = `WOODFLEX DESIGNS - CURATED COLLECTION\n==================================\nDate: ${date}\nFor: ${userData.name || 'Client'}\nCity: ${userData.city || 'Not specified'}\nRoom: ${roomType}\n`;

        const blob = new Blob([header + content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Woodflex_Collection_${userData.name.replace(/\s+/g, '_') || 'Guest'}.txt`;
        link.click();
        URL.revokeObjectURL(url);
        trackEvent("houseowner_download_txt", { roomType });
    };

    const handlePrint = () => {
        trackEvent("houseowner_print_pdf", { roomType });
        window.print();
    };

    return {
        roomType, setRoomType,
        categoryIndex, setCategoryIndex,
        likedByCategory, setLikedByCategory,
        showShortlist, setShowShortlist,
        userData, setUserData,
        isLeadModalOpen, setIsLeadModalOpen,
        isSaving, setIsSaving,
        showOnboarding, setShowOnboarding,
        flow, currentCategory,
        handleCategoryDone,
        handleWhatsAppShortlist,
        handleDownloadTxt,
        handlePrint,
        shuffledProducts
    };
}
