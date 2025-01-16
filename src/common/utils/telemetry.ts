import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates telemetry IDs including:
 * - macMachineId: 64-character hex string
 * - machineId: 64-character hex string
 * - devDeviceId: UUID v4
 */
export function generateTelemetryIds() {
    // Generate 32 random bytes (256 bits) and convert to hex string
    const generateHexId = () => randomBytes(32).toString('hex');

    return {
        'telemetry.macMachineId': generateHexId(),
        'telemetry.machineId': generateHexId(),
        'telemetry.devDeviceId': uuidv4()
    };
}
