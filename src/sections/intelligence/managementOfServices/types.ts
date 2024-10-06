export interface FileDetails {
  Benign: number;
  Malware: number;
}

export interface ResultsUploadAiProps {
  results: AnalysedFile[];
}

export interface AnalysedFile {
  'Analysed file': AnalysedFileData;
}

export interface AnalysedFileData {
  success: boolean;
  data: FileData;
  model_name: string;
}

export interface FileData {
  file_name: string;
  MD5_hash: string;
  SHA256_hash: string;
  scan_time: number;
  extra_information: ExtraInformation;
}

export interface ExtraInformation {
  name_of_model: string;
  result: string;
  details: FileDetails;
}

export interface FileDetailsCardProps {
  details: FileDetails | null;
}

export interface FileProgressProps {
  details: FileDetails | null;
}
