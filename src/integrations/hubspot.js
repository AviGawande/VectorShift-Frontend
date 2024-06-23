import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    CircularProgress
} from '@mui/material';
import axios from 'axios';

export const HubSpotIntegration = ({ user, org, integrationParams, setIntegrationParams }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectClick = async () => {
        try {
            setIsConnecting(true);
            const response = await axios.post(`http://localhost:8000/integrations/hubspot/authorize_hubspot`, {
                user_id: user,
                org_id: org
            });
            const authURL = response?.data?.authorization_url;

            if (authURL) {
                const newWindow = window.open(authURL, 'HubSpot Authorization', 'width=600, height=600');
                const pollTimer = window.setInterval(() => {
                    if (newWindow?.closed !== false) {
                        window.clearInterval(pollTimer);
                        handleWindowClosed();
                    }
                }, 200);
            } else {
                console.error('Authorization URL is not available');
                setIsConnecting(false);
            }
        } catch (e) {
            console.error('Error during authorization:', e);
            setIsConnecting(false);
            alert(e?.response?.data?.detail || 'An error occurred during authorization');
        }
    };

    const handleWindowClosed = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/integrations/hubspot/credentials`, {
                user_id: user,
                org_id: org
            });
            const credentials = response.data;
            if (credentials) {
                setIsConnecting(false);
                setIsConnected(true);
                setIntegrationParams(prev => ({ ...prev, credentials: credentials, type: 'HubSpot' }));
            } else {
                console.error('No credentials received');
                setIsConnecting(false);
            }
        } catch (e) {
            console.error('Error fetching credentials:', e);
            setIsConnecting(false);
            alert(e?.response?.data?.detail || 'An error occurred while fetching credentials');
        }
    };

    useEffect(() => {
        setIsConnected(!!integrationParams?.credentials);
    }, [integrationParams]);

    return (
        <>
            <Box sx={{ mt: 2 }}>
                Parameters
                <Box display='flex' alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
                    <Button
                        variant='contained'
                        onClick={isConnected ? () => {} : handleConnectClick}
                        color={isConnected ? 'success' : 'primary'}
                        disabled={isConnecting}
                        style={{
                            pointerEvents: isConnected ? 'none' : 'auto',
                            cursor: isConnected ? 'default' : 'pointer',
                            opacity: isConnected ? 1 : undefined
                        }}
                    >
                        {isConnected ? 'HubSpot Connected' : isConnecting ? <CircularProgress size={20} /> : 'Connect to HubSpot'}
                    </Button>
                </Box>
            </Box>
        </>
    );
};
