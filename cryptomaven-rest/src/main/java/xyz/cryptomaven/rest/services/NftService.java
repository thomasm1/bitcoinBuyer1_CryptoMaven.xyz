package xyz.cryptomaven.rest.services;

import xyz.cryptomaven.rest.models.dto.NftCoinDto;

import java.util.List;
import java.util.Optional;

public interface NftService {
  NftCoinDto createNft(NftCoinDto c);

  public Optional<NftCoinDto> getNft(Long id) ;

    List<NftCoinDto> getAllNFTsByName(String name);

    List<NftCoinDto> getAllNFTs();

    boolean updateNft(NftCoinDto change);

    boolean deleteNft(Long id) ;

    void nftlotViewAll();
}
