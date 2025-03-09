import { useRef, useState, useEffect } from 'react';
import { Conversation } from './elevenlabs-client';

interface ConversationConfig {
    onConnect?: (data: { conversationId: string }) => void;
    onDisconnect?: () => void;
    onError?: (message: string, details?: any) => void;
    onDebug?: (data: any) => void;
    onMessage?: (data: { source: string; message: string }) => void;
    onStatusChange?: (data: { status: string }) => void;
    onModeChange?: (data: { mode: string }) => void;
    onAudioData?: (audioData: Uint8Array) => void; // Simplified handler
    agentId?: string;
    signedUrl?: string;
    [key: string]: any;
}

const DEFAULT_HANDLERS: Required<Pick<ConversationConfig, 
    'onConnect' | 'onDisconnect' | 'onError' | 'onDebug' | 
    'onMessage' | 'onStatusChange' | 'onModeChange' | 'onAudioData'>> = {
    onConnect: () => {},
    onDisconnect: () => {},
    onError: () => {},
    onDebug: () => {},
    onMessage: () => {},
    onStatusChange: () => {},
    onModeChange: () => {},
    onAudioData: () => {} // Add default handler
};

/**
 * Helper function to merge objects with proper typing
 */
function mergeConfigs(...configs: Partial<ConversationConfig>[]): ConversationConfig {
    return Object.assign({}, DEFAULT_HANDLERS, ...configs);
}

/**
 * Custom hook to manage conversation state and audio handling
 */
function useConversation(defaultConfig: Partial<ConversationConfig> = {}) {
    // Refs to maintain conversation instances
    const conversationRef = useRef<any>(null);
    const pendingConversationRef = useRef<Promise<any> | null>(null);
    
    // State management
    const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
    const [conversationMode, setConversationMode] = useState<string>('listening');
    let converstionIdCreated:any;

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            conversationRef.current?.endSession();
        };
    }, []);

    /**
     * Starts a new conversation session
     */
    const startSession = async (config: Partial<ConversationConfig> = {}) => {
        // Return existing conversation ID if available
        if (conversationRef.current) {
            return conversationRef.current.getId();
        }
        
        // Return pending conversation ID if exists
        if (pendingConversationRef.current) {
            const conversation = await pendingConversationRef.current;
            // return conversation.getId();
            return conversation;
        }

        try {
            // Create merged configuration with proper handlers
            const mergedConfig = mergeConfigs(
                defaultConfig,
                config,
                {
                    onModeChange: ({ mode }: { mode: string }) => {
                        setConversationMode(mode);
                        // Call the user's handler if provided
                        defaultConfig.onModeChange?.(({ mode }));
                        config.onModeChange?.(({ mode }));
                    },
                    onStatusChange: ({ status }: { status: string }) => {
                        setConnectionStatus(status);
                        // Call the user's handler if provided
                        defaultConfig.onStatusChange?.(({ status }));
                        config.onStatusChange?.(({ status }));
                    },
                    onAudioData: (audioData: Uint8Array) => {
                        defaultConfig.onAudioData?.(audioData);
                        config.onAudioData?.(audioData);
                    }
                }
            );

            // Initialize new conversation
            pendingConversationRef.current = Conversation.startSession(mergedConfig);

            // Await conversation initialization
            conversationRef.current = await pendingConversationRef.current;
            // return conversationRef.current.getId();
            // console.log("Inside eleven react line 104 : ", conversationRef.current.connection.conversationId);
            converstionIdCreated = conversationRef.current.connection.conversationId;
            return conversationRef.current;
            
        } finally {
            pendingConversationRef.current = null;
        }
    };

    /**
     * Ends the current conversation session
     */
    const endSession = async () => {
        const currentConversation = conversationRef.current;
        const conversationId = currentConversation?.connection?.conversationId;
        conversationRef.current = null;
        await currentConversation?.endSession();
        return conversationId;
    };

    /**
     * Sets the volume for the conversation
     */
    const setVolume = ({ volume }: { volume: number }) => {
        pendingConversationRef.current?.then(conversation => {
            conversation.setVolume({ volume });
        });
        conversationRef.current?.setVolume({ volume });
    };

    /**
     * Gets frequency data for audio visualization
     */
    const getInputByteFrequencyData = () => {
        return conversationRef.current?.getInputByteFrequencyData();
    };

    const getOutputByteFrequencyData = () => {
        return conversationRef.current?.getOutputByteFrequencyData();
    };

    /**
     * Gets volume levels for input/output
     */
    const getInputVolume = () => {
        return conversationRef.current?.getInputVolume() ?? 0;
    };

    const getOutputVolume = () => {
        return conversationRef.current?.getOutputVolume() ?? 0;
    };

   
    const getConversationId = () => {
        return converstionIdCreated; 
        //return conversationRef.current?.connection?.conversationId; 
    }

    return {
        // Session management
        startSession,
        endSession,
        setVolume,
        
        // Audio data getters
        getInputByteFrequencyData,
        getOutputByteFrequencyData,
        getInputVolume,
        getOutputVolume,
        getConversationId,
        
        // State
        status: connectionStatus,
        isSpeaking: conversationMode === 'speaking'
    };
}

export { useConversation };