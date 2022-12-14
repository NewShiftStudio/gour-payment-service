import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IPaymentApiService } from '../@types/services-implementation';
import { PaymentApiCreateDto } from './dto/api-create.dto';
import { firstValueFrom } from 'rxjs';
import { PaymentApiResponseDto } from './dto/api-response.dto';
import { PaymentCreateResponseDto } from './dto/response.dto';
import { PaymentApiFinish3dSecureDto } from './dto/api-finish-3d-secure.dto';
import { PaymentApiGet3dSecureUrlDto } from './dto/api-get-3d-secure-url.dto';

@Injectable()
export class PaymentApiService implements IPaymentApiService {
  constructor(private readonly httpService: HttpService) {}
  async createPayment(
    dto: PaymentApiCreateDto,
  ): Promise<PaymentCreateResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.post<PaymentApiResponseDto>(
        '/payments/cards/charge',
        dto,
      ),
    );
    return {
      transactionId: data?.Model?.TransactionId,
      success: data.Success,
      errorMessage: data.Message,
      acsUrl: data?.Model?.AcsUrl,
      paReq: data?.Model?.PaReq,
    };
  }

  async finish3dSecure(
    dto: PaymentApiFinish3dSecureDto,
  ): Promise<PaymentCreateResponseDto> {
    const { data } = await firstValueFrom(
      this.httpService.post<PaymentApiResponseDto>(
        'payments/cards/post3ds',
        dto,
      ),
    );
    return {
      transactionId: data?.Model?.TransactionId,
      success: data.Success,
      errorMessage: data.Message,
      acsUrl: data?.Model?.AcsUrl,
      paReq: data?.Model?.PaReq,
    };
  }
}
