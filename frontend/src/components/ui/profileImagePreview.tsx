import profileImageIcon from "../../assets/ProfileImageIcon.png";
import profileImage from "../../assets/ProfileImage.png"

interface ProfileImagePreviewProps {
    isMobile:boolean;
    avatarPreview: string | null;
}

export default function ProfileImagePreview({isMobile,avatarPreview }: ProfileImagePreviewProps) {
    const deafultIcon = isMobile ? profileImage : profileImageIcon;
    return (
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
            {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" alt="avatar"/>
            ) : (
                <img src={deafultIcon} className="w-full h-full object-cover" alt="default"/>
            )}
        </div>
    );
}

