import profileImageIcon from "../../assets/ProfileImageIcon.png";

interface ProfileImagePreviewProps {
    avatarPreview: string | null;
}

export default function ProfileImagePreview({ avatarPreview }: ProfileImagePreviewProps) {
    return (
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {avatarPreview ? (
                <img src={avatarPreview} className="w-full h-full object-cover" alt="avatar"/>
            ) : (
                <img src={profileImageIcon} className="w-full h-full object-cover" alt="default"/>
            )}
        </div>
    );
}

