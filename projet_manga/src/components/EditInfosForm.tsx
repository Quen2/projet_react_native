import {Pressable, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {UserType} from "@/type/user/userType";
import {useAuth} from "@/context/AuthContext";
import {createUser, deleteStoredUser, getAllUsers, updateStoredUser} from "@/api/user/userStorage";

const INPUT_CLASS =
    "h-12 rounded border-[0.5px] border-outline bg-white px-2 font-inter text-xs text-ink placeholder:text-outline";

const BUTTON_SHADOW = {boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"};

export default function AdminUsersForm() {
    const {user: currentUser, updateUser} = useAuth();
    const [users, setUsers] = useState<UserType[]>([]);
    const [message, setMessage] = useState<{text: string; error: boolean} | null>(null);
    const [editingEmail, setEditingEmail] = useState<string | null>(null);
    const [editUsername, setEditUsername] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const loadUsers = async () => setUsers(await getAllUsers());

    useEffect(() => {
        loadUsers();
    }, []);

    const startEdit = (u: UserType) => {
        setEditingEmail(u.email);
        setEditUsername(u.username);
        setConfirmDelete(null);
        setMessage(null);
    };

    const handleEdit = async (email: string) => {
        const trimmed = editUsername.trim();
        if (!trimmed) {
            setMessage({text: "Le pseudo ne peut pas être vide", error: true});
            return;
        }

        if (email === currentUser?.email) {
            await updateUser({username: trimmed});
        } else {
            await updateStoredUser(email, {username: trimmed});
        }

        setEditingEmail(null);
        setMessage({text: "Utilisateur modifié", error: false});
        await loadUsers();
    };

    const handleDelete = async (email: string) => {
        if (confirmDelete !== email) {
            setConfirmDelete(email);
            return;
        }
        await deleteStoredUser(email);
        setConfirmDelete(null);
        setMessage({text: "Utilisateur supprimé", error: false});
        await loadUsers();
    };

    const handleAdd = async () => {
        if (!newUsername.trim() || !newEmail.trim() || !newPassword) {
            setMessage({text: "Tous les champs sont obligatoires", error: true});
            return;
        }
        try {
            await createUser(newUsername.trim(), newEmail.trim(), newPassword);
            setNewUsername("");
            setNewEmail("");
            setNewPassword("");
            setMessage({text: "Utilisateur ajouté", error: false});
            await loadUsers();
        } catch (e) {
            setMessage({text: (e as Error).message, error: true});
        }
    };

    return (
        <View>
            <Text className="font-inter-semibold text-base text-ink">Utilisateurs ({users.length})</Text>

            {message ? (
                <Text
                    className={`mt-2 font-inter-light text-[10px] ${
                        message.error ? "text-red-500" : "text-primary"
                    }`}
                >
                    {message.error ? "*" : ""}{message.text}
                </Text>
            ) : null}

            {/* Liste */}
            <View className="mt-3 gap-2">
                {users.map((u) => {
                    const isMe = u.email === currentUser?.email;
                    const isEditing = editingEmail === u.email;
                    const isConfirming = confirmDelete === u.email;

                    return (
                        <View key={u.email} className="rounded-lg border-[0.5px] border-outline bg-white p-3">
                            <View className="flex-row items-center">
                                <View className="flex-1">
                                    <View className="flex-row items-center">
                                        <Text className="font-inter-semibold text-sm text-ink">{u.username}</Text>
                                        {u.role === "admin" ? (
                                            <View className="ml-2 rounded border-[0.5px] border-primary px-1.5 py-0.5">
                                                <Text className="font-inter-medium text-[10px] text-primary">Admin</Text>
                                            </View>
                                        ) : null}
                                        {isMe ? (
                                            <Text className="ml-2 font-inter-light text-[10px] text-ink">(vous)</Text>
                                        ) : null}
                                    </View>
                                    <Text className="mt-0.5 font-inter text-xs text-ink">{u.email}</Text>
                                </View>

                                {!isEditing ? (
                                    <View className="flex-row gap-3">
                                        <Pressable onPress={() => startEdit(u)} hitSlop={8}>
                                            <Text className="font-inter-medium text-xs text-primary underline">Modifier</Text>
                                        </Pressable>
                                        {!isMe ? (
                                            <Pressable onPress={() => handleDelete(u.email)} hitSlop={8}>
                                                <Text className="font-inter-medium text-xs text-red-500 underline">
                                                    {isConfirming ? "Confirmer ?" : "Supprimer"}
                                                </Text>
                                            </Pressable>
                                        ) : null}
                                    </View>
                                ) : null}
                            </View>

                            {isEditing ? (
                                <View className="mt-3">
                                    <TextInput
                                        value={editUsername}
                                        onChangeText={setEditUsername}
                                        placeholder="Nouveau pseudo...."
                                        autoCapitalize="none"
                                        className={INPUT_CLASS}
                                    />
                                    <View className="mt-3 flex-row gap-2">
                                        <Pressable
                                            onPress={() => setEditingEmail(null)}
                                            className="h-10 flex-1 items-center justify-center rounded-lg border-[0.5px] border-outline bg-white"
                                        >
                                            <Text className="font-inter-medium text-sm text-ink">Annuler</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => handleEdit(u.email)}
                                            className="h-10 flex-1 items-center justify-center rounded-lg bg-primary active:opacity-80"
                                            style={BUTTON_SHADOW}
                                        >
                                            <Text className="font-inter-medium text-sm text-white">Enregistrer</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    );
                })}
            </View>

            <View className="my-8 h-px bg-outline" />

            <Text className="font-inter-semibold text-base text-ink">Ajouter un utilisateur</Text>

            <Text className="mt-4 font-inter-semibold text-sm text-ink">Nom d'utilisateur</Text>
            <TextInput
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="Entrez un nom d'utilisateur...."
                autoCapitalize="none"
                className={`mt-2 ${INPUT_CLASS}`}
            />

            <Text className="mt-3 font-inter-semibold text-sm text-ink">Email</Text>
            <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Entrez un email...."
                keyboardType="email-address"
                autoCapitalize="none"
                className={`mt-2 ${INPUT_CLASS}`}
            />

            <Text className="mt-3 font-inter-semibold text-sm text-ink">Mot de passe</Text>
            <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Entrez un mot de passe...."
                secureTextEntry
                className={`mt-2 ${INPUT_CLASS}`}
            />

            <Pressable
                onPress={handleAdd}
                className="mt-5 h-10 items-center justify-center rounded-lg bg-primary px-4 active:opacity-80"
                style={BUTTON_SHADOW}
            >
                <Text className="font-inter-medium text-base text-white">Ajouter l'utilisateur</Text>
            </Pressable>
        </View>
    );
}