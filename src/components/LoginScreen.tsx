import React, { useState } from 'react';
import { Page, ScrollView, StackLayout, TextField, Label, Button, ActivityIndicator } from '@nativescript/core';
import type { LoginCredentials, LoginState } from '../types/mikrotik';

export function LoginScreen() {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        host: '',
        username: '',
        password: '',
        port: 8728
    });

    const [loginState, setLoginState] = useState<LoginState>({
        isLoading: false,
        error: null,
        isConnected: false
    });

    const handleLogin = async () => {
        setLoginState({ isLoading: true, error: null, isConnected: false });
        
        try {
            // Simulated API call - replace with actual MikroTik API integration
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoginState({
                isLoading: false,
                error: null,
                isConnected: true
            });
        } catch (error) {
            setLoginState({
                isLoading: false,
                error: 'Connection failed. Please check your credentials.',
                isConnected: false
            });
        }
    };

    return (
        <Page>
            <ScrollView>
                <StackLayout className="form-container">
                    <Label text="MikroTik Login" className="title" />
                    <Label text="Connect to your router" className="subtitle" />

                    <Label text="Router IP/Hostname" className="label" />
                    <TextField
                        className="input-field"
                        value={credentials.host}
                        onTextChange={(args) => setCredentials({
                            ...credentials,
                            host: args.value
                        })}
                        hint="192.168.1.1"
                    />

                    <Label text="Username" className="label" />
                    <TextField
                        className="input-field"
                        value={credentials.username}
                        onTextChange={(args) => setCredentials({
                            ...credentials,
                            username: args.value
                        })}
                        hint="admin"
                    />

                    <Label text="Password" className="label" />
                    <TextField
                        className="input-field"
                        value={credentials.password}
                        secure={true}
                        onTextChange={(args) => setCredentials({
                            ...credentials,
                            password: args.value
                        })}
                    />

                    <Label text="Port (Optional)" className="label" />
                    <TextField
                        className="input-field"
                        value={credentials.port?.toString()}
                        keyboardType="number"
                        onTextChange={(args) => setCredentials({
                            ...credentials,
                            port: parseInt(args.value) || 8728
                        })}
                        hint="8728"
                    />

                    {loginState.error && (
                        <Label text={loginState.error} className="error-message" textWrap={true} />
                    )}

                    <Button
                        text={loginState.isLoading ? "Connecting..." : "Connect"}
                        className="btn-primary"
                        onTap={handleLogin}
                        isEnabled={!loginState.isLoading}
                    />

                    {loginState.isLoading && (
                        <ActivityIndicator busy={true} />
                    )}
                </StackLayout>
            </ScrollView>
        </Page>
    );
}