export interface VerificationResult {
    txHash: string;
    verified: boolean;
    timestamp: string;
}

export const web3Service = {
    async verifyImpact(impactId: string): Promise<VerificationResult> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
                    verified: true,
                    timestamp: new Date().toISOString()
                });
            }, 1500);
        });
    },

    async castVote(proposalId: number, power: number): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`0x${Math.random().toString(16).substring(2, 42)}`);
            }, 2000);
        });
    },

    async connectWallet(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`0x${Math.random().toString(16).substring(2, 42)}`);
            }, 1000);
        });
    }
};
