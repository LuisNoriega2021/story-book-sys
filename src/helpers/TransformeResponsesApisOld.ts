import { CodesExito, CodesErrorServer } from '../constants/enums';
import { IStandarResponse } from '../interfaces/IServices/IApiResponses';
import IOldApiResponse from '../interfaces/IServices/IOldApiResponse';
import StandarResponse from '../models/StandarResponse';

class TransformeResponsesApisOld {
	static resolve(dataResponse: IOldApiResponse): IStandarResponse {
		return new StandarResponse({
			ReturnCode: dataResponse.IsSuccess ? CodesExito.OK : CodesErrorServer.INTERNALSERVERERROR,
			ReturnSubCode: '',
			ReturnMsg: dataResponse.Message,
			ReturnData: dataResponse.Result,
		});
	}
}

export default TransformeResponsesApisOld;
