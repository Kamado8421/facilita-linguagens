import Image from 'next/image';

import BookIcon from '@/src/assets/book.svg';
import TagIcon from '@/src/assets/tag.svg';
import ClockIcon from '@/src/assets/clock.svg';

export default function DashboardBoxIcon({ icon }: { icon: 'book' | 'tag' | 'clock' }) {

    const Icon = icon === 'book' ? BookIcon : icon === 'tag' ? TagIcon : ClockIcon;

    return (
        <div className="bg-transparent">
            <Image src={Icon} alt={`icon ${icon}`} width={80} />
        </div>
    )
}