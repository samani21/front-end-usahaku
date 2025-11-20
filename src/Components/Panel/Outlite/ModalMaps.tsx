import Modal from '@/Components/component/Modal'
import dynamic from 'next/dynamic';
import React from 'react'
const MapWithSearch = dynamic(() => import('@/Components/component/MapWithSearch'), {
    ssr: false,
});
type LocationItem = {
    id: number;
    lat: number;
    lng: number;
    value: string;
};
type Props = {
    openMapId: number | null
    setOpenMapId: (val: number | null) => void;
    updateAddress: (id: number | null, key: any, val: string | number) => void
    addresses: LocationItem[];
}

const ModalMaps = ({ openMapId, setOpenMapId, updateAddress, addresses }: Props) => {
    return (
        <Modal
            open={openMapId ? true : false}
        // onClose={() => setOpenMapId(null)}

        >
            <div className='w-lg'>
                <MapWithSearch onSelect={(lat, lng) => {
                    updateAddress(openMapId, "lat", lat);
                    updateAddress(openMapId, "lng", lng);
                    setOpenMapId(null);
                }}
                    lat={addresses[Number(openMapId) - 1]?.lat}
                    lng={addresses[Number(openMapId) - 1]?.lng}
                    close={() => setOpenMapId(null)} />
            </div>
        </Modal>
    )
}

export default ModalMaps