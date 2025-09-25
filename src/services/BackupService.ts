import RNFS from 'react-native-fs';
import {Alert} from 'react-native';
import DatabaseService from './DatabaseService';

class BackupService {
  private getBackupPath(): string {
    return `${RNFS.DocumentDirectoryPath}/expense_backup.json`;
  }

  async createBackup(): Promise<void> {
    try {
      const backupData = await DatabaseService.getAllExpensesForBackup();
      const backupPath = this.getBackupPath();
      
      await RNFS.writeFile(backupPath, backupData, 'utf8');
      
      Alert.alert(
        'Backup Successful',
        `Backup created at: ${backupPath}`,
        [{text: 'OK'}]
      );
    } catch (error) {
      console.error('Backup failed:', error);
      Alert.alert('Backup Failed', 'Could not create backup file');
    }
  }

  async restoreFromBackup(): Promise<void> {
    try {
      const backupPath = this.getBackupPath();
      
      // Check if backup file exists
      const fileExists = await RNFS.exists(backupPath);
      if (!fileExists) {
        Alert.alert('No Backup Found', 'No backup file exists');
        return;
      }

      const backupData = await RNFS.readFile(backupPath, 'utf8');
      await DatabaseService.restoreFromBackup(backupData);
      
      Alert.alert(
        'Restore Successful',
        'Data has been restored from backup',
        [{text: 'OK'}]
      );
    } catch (error) {
      console.error('Restore failed:', error);
      Alert.alert('Restore Failed', 'Could not restore from backup file');
    }
  }

  async checkBackupExists(): Promise<boolean> {
    try {
      const backupPath = this.getBackupPath();
      return await RNFS.exists(backupPath);
    } catch (error) {
      return false;
    }
  }
}

export default new BackupService();